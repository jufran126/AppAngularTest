import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.servicio';

@Component({
  selector: 'buscar-pcategoria',
  templateUrl: './buscar-pcategoria.component.html',
  styleUrls: ['./buscar-pcategoria.component.css']
})
export class BuscarPCategoriaComponent implements OnInit {

  productos: any;
  constructor(private productosService: ProductosService) { }

  ngOnInit() { }

  public filtrar(categoria) {
    if (categoria.value=="")
      this.productosService.getProducto().subscribe(data => this.productos = data);
    else
      this.productosService.getProductoCategoria(categoria.value).subscribe(data => this.productos = data);
  }
  public limpiar(categoria) {
    categoria.value = "";
    this.productosService.getProducto().subscribe(data => this.productos = data);
  }
}
