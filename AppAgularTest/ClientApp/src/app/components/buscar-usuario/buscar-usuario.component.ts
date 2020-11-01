import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {
  usuarios: any;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }
  public cambio(tipoU) {
    if (tipoU.value == "")
      this.usuarioService.getUsuario().subscribe(data => this.usuarios = data);
    else
      this.usuarioService.filtrarUsuario(tipoU.value).subscribe(data => this.usuarios = data);
  }

}
