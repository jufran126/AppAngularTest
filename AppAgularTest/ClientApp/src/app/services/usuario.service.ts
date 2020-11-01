import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl: string;
  constructor(private http: HttpClient, @Inject("BASE_URL") BaseUrl: string) {
    this.baseUrl = BaseUrl;
  }
  public getTiposUsuario() {
    return this.http.get(this.baseUrl + "api/Usuario/tipoUsuarios");
  }
  public getUsuario() {
    return this.http.get(this.baseUrl + "api/Usuario/getUsuarios");
  }
  public filtrarUsuario(tipoU) {
    return this.http.get(this.baseUrl + "api/Usuario/filtrarUsuarios/" + tipoU);
  }
}
