import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  @Output() clickButton: EventEmitter<any>;
  @Output() clickLimpiar: EventEmitter<any>;

  constructor() {
    this.clickButton = new EventEmitter();
    this.clickLimpiar = new EventEmitter();
  }

  ngOnInit() {
  }

  public filtrar(nombre) {
    this.clickButton.emit(nombre);
  }
  public limpiar(nombre) {
    this.clickLimpiar.emit(nombre);
  }
}
