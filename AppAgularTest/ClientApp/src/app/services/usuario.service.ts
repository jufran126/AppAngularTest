import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl: string;
  constructor(private http: HttpClient, @Inject("BASE_URL") BaseUrl: string, private router: Router) {
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
  public validarUsuario(idUsuario, nombre) {
    return this.http.get(this.baseUrl + "api/Usuario/validarUsuario/" + idUsuario + "/" + nombre);
  }
  public recuperarUsuario(idUsuario) {
    return this.http.get(this.baseUrl + "api/Usuario/recuperarUsuario/" + idUsuario );
  }
  public guardarDatos(usuario) {
    return this.http.post(this.baseUrl + "api/Usuario/guardarDatos", usuario);
  }
  public eliminarUsuario(idUsuario) {
    return this.http.get(this.baseUrl + "api/Usuario/eliminarUsuario/" + idUsuario);
  }
  public login(usuario) {
    return this.http.post(this.baseUrl + "api/Usuario/login", usuario);
  }
  public getVariableSession(next) {
    return this.http.get(this.baseUrl + "api/Usuario/getVariableSession").pipe(map((res:any) => {
      let valor = res.valor;
      if (valor) {
        if (next && res.lista) {
          var pagina = next["url"][0].path;
          var paginas = res.lista.map(p => p.accion)
          paginas.push('home');
          paginas.push("counter");
          if (paginas.indexOf(pagina) > -1 && pagina != "login")
            return true;
          else {
            this.router.navigate(["/permisologin"]);
            return false;
          }
        }
        return true;
      }
      else {
        this.router.navigate(["/errorlogin"]);
        return false;
      }
    }));
  }
  public cerrarSesion() {
    return this.http.get(this.baseUrl + "api/Usuario/cerrarSesion");
  }
  public listarPaginas() {
    return this.http.get(this.baseUrl + "api/Usuario/listarPaginas");
  }
}
