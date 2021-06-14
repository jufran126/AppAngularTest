import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.css']
})
export class FormPersonaComponent implements OnInit {

  persona: FormGroup;
  titulo: string
  parametro: string;
  constructor(private personaService: PersonaService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.persona = new FormGroup({
      "idPersona": new FormControl(0),
      "nombre": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "primerApellido": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      "segundoApellido": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "fechaNacimiento": new FormControl("", [Validators.required]),
      "telefono": new FormControl(0, [Validators.required, Validators.maxLength(100)]),
      "correo": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")], this.correoRepetido.bind(this)),
    });
    this.activatedRoute.params.subscribe(par => {
      this.parametro = par["id"];
      if (this.parametro == "nuevo")
        this.titulo = "Agregar nueva persona";
      else 
        this.titulo = "Editar persona";
    });
  }

  ngOnInit() {
    if (this.parametro != "nuevo") {
      this.personaService.recuperarPersona(this.parametro).subscribe((data: any) => {
        this.persona.controls["idPersona"].setValue(data.idPersona);
        this.persona.controls["nombre"].setValue(data.nombre);
        this.persona.controls["primerApellido"].setValue(data.primerApellido);
        this.persona.controls["segundoApellido"].setValue(data.segundoApellido);
        this.persona.controls["fechaNacimiento"].setValue(data.fechaCadena);
        this.persona.controls["telefono"].setValue(data.telefono);
        this.persona.controls["correo"].setValue(data.correo);
      });
    }
  }

  public guardarDatos() {
    if (this.persona.valid)
      this.personaService.guardarPersona(this.persona.value).subscribe(data => {
        if (data == 0)
          alert("No se pudo guardar la persona");
        else
          this.router.navigate(['/editpersonas']);
      });
  }
  public correoRepetido(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != null && control.value != "")
        this.personaService.validarCoreo(this.persona.controls["idPersona"].value, control.value)
          .subscribe(data => {
            if (data == 1)
              resolve({ yaExiste: true });
            else
              resolve(null);
          })
    });
    return promesa;
  }
}
