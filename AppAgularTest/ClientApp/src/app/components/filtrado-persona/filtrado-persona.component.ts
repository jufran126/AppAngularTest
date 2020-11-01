import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service'

@Component({
  selector: 'filtrado-persona',
  templateUrl: './filtrado-persona.component.html',
  styleUrls: ['./filtrado-persona.component.css']
})
export class FiltradoPersonaComponent implements OnInit {

  personas: any;
  constructor(private personaService: PersonaService) { }

  ngOnInit() {
  }
  public buscar(nombre) {
    this.personaService.buscarPersona(nombre.value).subscribe(data => this.personas = data);
  }

}
