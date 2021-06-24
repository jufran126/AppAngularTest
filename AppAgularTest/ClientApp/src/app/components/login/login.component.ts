import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    contraseña: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });
  error = false;
  urlBase = "";

  constructor(private usuarioService: UsuarioService, private router: Router, @Inject("BASE_URL") BaseUrl: string) {
    this.urlBase = BaseUrl;
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      let formD = this.loginForm.value;
      let data = {
        idUsuario: 1,
        nombreUsuario: formD.usuario,
        nombrePersona: "na",
        bHabilitado: 1,
        nombreTiposUsuario: "na",
        idPersona: 1,
        idTipoUsuario: 1,
        contraseña: formD.contraseña,
        contraseña2: "na"
      };
      this.usuarioService.login(data).subscribe((res:any) => {
        if (res.idUsuario == 0) {
          this.error = true;
        }
        else {
          this.error = false;
          //this.router.navigate(['/']);
          window.location.href = this.urlBase;
        }
      });
    }
  }
}
