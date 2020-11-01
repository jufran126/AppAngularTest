import { Component, OnInit, Input } from '@angular/core';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.css']
})
export class TablaPersonaComponent implements OnInit {

  @Input() personas: any;
  @Input() isEdit: false;
  cabeceras: string[] = ["Id persona", "Nombre", "Telefono", "Correo","Fecha Nacimiento"];
  constructor(private persanaService: PersonaService) { }

  ngOnInit() {
    this.persanaService.getPersona().subscribe(data => this.personas = data);
  }

}
