import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.servicio';

@Component({
  selector: 'buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  productos: any;
  constructor(private productoService: ProductosService) { }

  ngOnInit() {
  }

  public filtrar(nombre) {
    if (nombre.value == "")
      this.productoService.getProducto().subscribe(res => this.productos = res);
    else
      this.productoService.getProductoFiltro(nombre.value).subscribe(data => this.productos = data);
  }
  public limpiar(nombre) {
    nombre.value = "";
    this.productoService.getProducto().subscribe(res => this.productos = res);
  }

}
