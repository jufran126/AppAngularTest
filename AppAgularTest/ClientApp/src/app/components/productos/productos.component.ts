import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from '../../services/productos.servicio'

@Component({
  selector: 'productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @Input() productos: any;
  @Input() isEdit: false;
  p: number = 1;
  cabeceras: string[] = ["id Producto", "Nombre", "Precio", "Stock", "Nombre Categoria"];
  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.getProducto().subscribe(res => {
      this.productos = res
    });
  }


  public eliminarProducto(id) {
    if (confirm("¿Desea eliminar el elemento?")) {
      this.productosService.eliminar(id).subscribe(data => {
        if (data == 0)
          alert("Error, no se pudo eliminar el producto");
        else
          window.location.reload();
      });
    }
  }

}
