import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: string;
  constructor(private http: HttpClient, @Inject("BASE_URL") BaseUrl: string) {
    this.baseUrl = BaseUrl;
  }

  public getCategorias() {
    return this.http.get(this.baseUrl + "api/Categoria/getCategorias");
  }
}
