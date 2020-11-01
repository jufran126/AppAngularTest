import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service'

@Component({
  selector: 'categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: any;
  @Output() clickButton: EventEmitter<any>;
  @Output() clickLimpiar: EventEmitter<any>;
  constructor(private categoriaService: CategoriaService) {
    this.clickButton = new EventEmitter();
    this.clickLimpiar = new EventEmitter();
  }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(data => this.categorias = data);
  }
  public filtrar(categoria) {
    this.clickButton.emit(categoria);
  }

  public limpiar(categoria) {
    this.clickLimpiar.emit(categoria);
  }

}
