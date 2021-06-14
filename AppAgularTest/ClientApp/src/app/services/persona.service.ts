import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUrl: string;
  constructor(private http: HttpClient, @Inject("BASE_URL") BaseUrl: string) {
    this.baseUrl = BaseUrl;
  }

  public getPersona() {
    return this.http.get(this.baseUrl + "api/Persona/getPersona");
  }
  public buscarPersona(nombre) {
    return this.http.get(this.baseUrl + "api/Persona/filtrarPersona/" + nombre);
  }
  public guardarPersona(persona) {
    return this.http.post(this.baseUrl + "api/Persona/guardarPersona", persona);
  }
  public recuperarPersona(id) {
    return this.http.get(this.baseUrl + "api/Persona/recuperarPersona/"+id);
  }
  public eliminar(id) {
    return this.http.get(this.baseUrl + "api/Persona/eliminarPersona/" + id);
  }
  public validarCoreo(id, correo) {
    return this.http.get(this.baseUrl + "api/Persona/validarCorreo/" + id + "/" + correo);
  }
  public listarPersonasCombo() {
    return this.http.get(this.baseUrl + "api/Persona/listarPersonasCombo");
  }
}
