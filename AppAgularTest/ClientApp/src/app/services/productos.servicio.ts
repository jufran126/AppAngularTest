import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  baseUrl: string = '';
  constructor(private http: HttpClient, @Inject("BASE_URL") BaseUrl: string) {
    this.baseUrl = BaseUrl;
  }
  public getProducto() {
    return this.http.get(this.baseUrl + "api/Producto/listProductos");
  }
  public getProductoFiltro(nombre) {
    return this.http.get(this.baseUrl + "api/Producto/listProductosFiltro/" + nombre);
  }
  public getProductoCategoria(idCategoria) {
    return this.http.get(this.baseUrl + "api/Producto/listProductosCategoria/" + idCategoria);
  }
  public recuperarProducto(id) {
    return this.http.get(this.baseUrl + "api/Producto/recuperarProducto/" + id);
  }
  public guardar(producto) {
    return this.http.post(this.baseUrl + "api/Producto/guardarProducto", producto);
  }
  public eliminar(id) {
    return this.http.get(this.baseUrl + "api/Producto/eliminarProducto/" + id);
  }
}
