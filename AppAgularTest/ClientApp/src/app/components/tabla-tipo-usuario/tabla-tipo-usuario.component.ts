import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tabla-tipo-usuario',
  templateUrl: './tabla-tipo-usuario.component.html',
  styleUrls: ['./tabla-tipo-usuario.component.css']
})
export class TablaTipoUsuarioComponent implements OnInit {

  tiposUsuarios: any;
  cabeceras: string[] = ["Id Tipo Usuario", "Nombre", "Descripción"];
  @Input() isEdit: false;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.listarTiposUsuarios().subscribe(data => {
      if (data) {
        this.tiposUsuarios = data;
      }
    });
  }
  eliminarUser(idTipoUsuario) {
    this.usuarioService.eliminarTipoUsuario(idTipoUsuario).subscribe(data => {
      if (data == 0) 
        alert("Error, no se pudo eliminar el tipo de usuario");
      else
        window.location.reload();
    });
  }
}
