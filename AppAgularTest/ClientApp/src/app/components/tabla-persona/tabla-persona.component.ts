import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.css']
})
export class TablaPersonaComponent implements OnInit {

  @Input() personas: any;
  @Input() isEdit: false;
  p: number = 1;
  cabeceras: string[] = ["Id persona", "Nombre", "Telefono", "Correo", "Fecha Nacimiento"];
  constructor(private persanaService: PersonaService, private router: Router) { }

  ngOnInit() {
    this.persanaService.getPersona().subscribe(data => this.personas = data);
  }

  public eliminarPersona(id) {
    if (confirm("¿Desea elimar la persona?") == true)
      this.persanaService.eliminar(id).subscribe(data => {
        if (data == 0)
          alert("Error, no se pudo eliminar la persona");
        else
          window.location.reload();
      })
  }
}
