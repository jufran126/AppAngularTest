import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  usuario: FormGroup = new FormGroup({
    idUsuario: new FormControl(0, [Validators.required]),
    nombreUsuario: new FormControl('', [Validators.required, Validators.maxLength(100)], this.usuarioRepetido.bind(this)),
    contraseña: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    contraseña2: new FormControl("", [Validators.required, Validators.maxLength(100), this.verifiacarPass.bind(this)]),
    idPersona: new FormControl("", [Validators.required, ]),
    idTipoUsuario: new FormControl("", [Validators.required]),
  });
  titulo: string
  parametro: string;
  tiposUsuario: any;
  personas: any;
  ver: boolean = true;
  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute, private personaService: PersonaService) { }

  ngOnInit() {
    this.usuarioService.getTiposUsuario().subscribe(data => {
      this.tiposUsuario = data;
    });
    this.personaService.listarPersonasCombo().subscribe(data => {
      this.personas = data;
    });
    this.activatedRoute.params.subscribe(par => {
      this.parametro = par["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregar nuevo usuario";
        this.ver = true;
      }
      else {
        this.titulo = "Editar usuario";
        this.usuarioService.recuperarUsuario(this.parametro).subscribe((data: any) => {
          this.usuario.setValue({
            idUsuario: data.idUsuario,
            nombreUsuario: data.nombreUsuario,
            idTipoUsuario: data.idTipoUsuario,
            contraseña: "1",
            contraseña2: "1",
            idPersona: "1"
          });
        });
        this.ver = false;
      }
    });
  }
  verifiacarPass(pass: FormControl) {
    if (pass.value != null && pass.value != "")
      if (this.usuario.controls['contraseña'].value != pass.value)
        return { noIguales: true };
      else
        return null;
  }

  public usuarioRepetido(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != null && control.value != "")
        this.usuarioService.validarUsuario(this.usuario.controls["idUsuario"].value, control.value)
          .subscribe(data => {
            if (data == 1)
              resolve({ yaExiste: true });
            else
              resolve(null);
          })
    });
    return promesa;
  }

  guardarDatos() {
    let formD = this.usuario.value;
    let data = {
      idUsuario: +formD.idUsuario,
      nombreUsuario: formD.nombreUsuario,
      nombrePersona: "na",
      bHabilitado: 1,
      nombreTiposUsuario: "na",
      idPersona: +formD.idPersona,
      idTipoUsuario: +formD.idTipoUsuario,
      contraseña: formD.contraseña,
      contraseña2: formD.contraseña2
    };
    this.usuarioService.guardarDatos(data).subscribe(data => {
      this.router.navigate(["/edituser"]);
    });
  }

}
