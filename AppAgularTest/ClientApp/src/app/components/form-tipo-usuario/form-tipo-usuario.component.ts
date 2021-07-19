import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'form-tipo-usuario',
  templateUrl: './form-tipo-usuario.component.html',
  styleUrls: ['./form-tipo-usuario.component.css']
})
export class FormTipoUsuarioComponent implements OnInit {

  tipoUsuario: FormGroup;
  paginas: any;
  parametro: any;
  titulo: string;

  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.tipoUsuario = new FormGroup({
      idTipoUsuario: new FormControl(0),
      nombre: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      descripcion: new FormControl("", [Validators.required, Validators.maxLength(200)]),
      valores: new FormControl(""),
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(par => {
      this.parametro = par["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Nuevo tipo usuario";
      }
      else {
        this.titulo = "Editar tipo usuario";
        this.usuarioService.recuperarTipoUsuario(this.parametro).subscribe((data:any) => {
          if (data) {
            this.tipoUsuario.patchValue({ idTipoUsuario: data.idTipoUsuario, nombre: data.nombre, descripcion: data.descripcion });
            let listaPagina = data.listaPagina.map(d => d.idPagina);
            setTimeout(() => {
              var checks = document.getElementsByClassName("check");
              var check;
              for (let i = 0; i < checks.length; i++) {
                check = checks[i];
                let indice = listaPagina.indexOf(check.name * 1);
                if (indice > -1) {
                  check.checked = true;
                }
              }
            }, 500);
          }
        });
      }
    });
    this.usuarioService.listarPaginasTipoUsuario().subscribe(datos => {
      if (datos) {
        this.paginas = datos;
      }
    });
  }

  guardarDatos() {
    this.verCheck();
    let tiposUser = this.tipoUsuario.value;
    let datos = {
      idTipoUsuario: tiposUser.idTipoUsuario * 1,
      nombre: tiposUser.nombre,
      descripcion: tiposUser.descripcion,
      valores: tiposUser.valores,
      bhabilitado: 1,
      listaPagina: []
    };
    this.usuarioService.guardarTipoUsuario(datos).subscribe((data: any) => {
      if (data == 0) {
        alert("No se pudo guardar el tipo de usuario");
      }
      else {
        this.router.navigate(['/mant-tipoUsuario']);
      }
    });
  }

  verCheck() {
    let selecionados = "";
    var checks = document.getElementsByClassName("check");
    var check;
    for (let i = 0; i < checks.length; i++) {
      check = checks[i];
      if (check.checked)
        selecionados += check.name + "$";
    }
    if (selecionados)
      selecionados = selecionados.substring(0, selecionados.length - 1);
    this.tipoUsuario.patchValue({ valores: selecionados });
  }
}
