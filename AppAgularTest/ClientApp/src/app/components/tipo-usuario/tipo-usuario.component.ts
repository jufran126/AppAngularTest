import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {

  tUsuarios: any;
  @Output() selectTipo: EventEmitter<any>
  constructor(private usurarioService: UsuarioService) {
    this.selectTipo = new EventEmitter();
  }

  ngOnInit() {
    this.usurarioService.getTiposUsuario().subscribe(data => this.tUsuarios = data);
  }
  public cambio(tipoU) {
    this.selectTipo.emit(tipoU);
  }
}
