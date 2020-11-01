import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from '../../services/productos.servicio'

@Component({
  selector: 'productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @Input() productos: any;
  cabeceras: string[] = ["id Producto", "Nombre", "Precio", "Stock", "Nombre Categoria"];
  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.getProducto().subscribe(res => this.productos = res);
  }

}
