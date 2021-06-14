import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent implements OnInit {
  @Input() usuarios: any;
  @Input() isEdit: false;
  cabeceras: string[] = ["Id Usuario", "Nombre", "Usuario", "Tipo"];
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuario().subscribe(data => this.usuarios = data);
  }
  eliminarUser(idUsuario) {
    if (confirm("¿Desea elimniar el usuario?") == true)
      this.usuarioService.eliminarUsuario(idUsuario).subscribe(data => {
        this.usuarioService.getUsuario().subscribe(data => this.usuarios = data);
      });
  }
}
