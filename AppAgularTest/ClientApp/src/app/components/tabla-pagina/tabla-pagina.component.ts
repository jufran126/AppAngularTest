import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tabla-pagina',
  templateUrl: './tabla-pagina.component.html',
  styleUrls: ['./tabla-pagina.component.css']
})
export class TablaPaginaComponent implements OnInit {

  cabeceras: string[] = ["Id Pagina", "Nombre Pagina", "Acción"];
  paginas: any;
  @Input() isEdit = false;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.usuarioService.listarPaginasBD().subscribe(datos => {
      if (datos)
        this.paginas = datos;
    });
  }

  eliminarUser(id) { 
    if (confirm("¿Desea eliminar el registro?")) {
      this.usuarioService.eliminarPagina(id).subscribe(dato => {
        if (dato == 0) {
          alert("No se pudo eliminar la pagina");
        }
        else {
          window.location.reload();
        }
      });
    }
  }

}
