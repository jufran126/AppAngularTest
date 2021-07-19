import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'form-pagina',
  templateUrl: './form-pagina.component.html',
  styleUrls: ['./form-pagina.component.css']
})
export class FormPaginaComponent implements OnInit {

  pagina: FormGroup;
  titulo: string;
  parametro: any;

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private router: Router) {
    this.pagina = new FormGroup({
      idPagina: new FormControl(0),
      mensaje: new FormControl("", [Validators.required, Validators.maxLength(200)]),
      accion: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      bVisible: new FormControl("1"),
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
        this.usuarioService.recuperarPagina(this.parametro).subscribe((datos: any) => {
          if (datos) {
            this.pagina.setValue({ idPagina: datos.idPagina, mensaje: datos.mensaje, accion: datos.accion, bVisible: datos.bVisible.toString() });
          }
          else {
            this.router.navigate(['/noInfo'])
          }
        });
      }
    });
  }

  guardarDatos() {
    if (this.pagina.valid) {
      let pagina = this.pagina.value;
      let data = {
        idPagina: pagina.idPagina * 1,
        mensaje: pagina.mensaje,
        accion: pagina.accion,
        bHabilitado: 1,
        bVisible: pagina.bVisible * 1
      };
      this.usuarioService.guardarPagina(data).subscribe(dato => {
        if (dato == 0) {
          alert("No se pudo guardar la pagina");
        }
        else {
          this.router.navigate(['/mant-pagina']);
        }
      });
    }
  }

}
