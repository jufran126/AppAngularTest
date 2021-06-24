import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  login = false;
  menus: any;
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.usuarioService.getVariableSession(null).subscribe(data => {
      this.login = data;
      if (data) {
        this.usuarioService.listarPaginas().subscribe(data => {
          this.menus = data;
        });
      }
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  cerrarSesion() {
    this.usuarioService.cerrarSesion().subscribe((data:any) => {
      if (data.valor == "ok") {
        this.login = false;
        this.router.navigate(["/login"]);
      }
    });
  }
}
