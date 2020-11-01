import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.css']
})
export class BuscarPersonaComponent implements OnInit {

  @Output() buscarNombre: EventEmitter<any>;
  constructor() {
    this.buscarNombre = new EventEmitter();
  }

  ngOnInit() {  
  }
  buscar(nombre) {
    this.buscarNombre.emit(nombre);
  }
}
