import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProductosService } from './services/productos.servicio';
import { CategoriaService } from './services/categoria.service';
import { PersonaService } from './services/persona.service';
import { UsuarioService } from './services/usuario.service';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductosComponent } from './components/productos/productos.component';
import { BuscarProductoComponent } from './components/buscar-producto/buscar-producto.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { BuscarPCategoriaComponent } from './components/buscar-pcategoria/buscar-pcategoria.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { TablaPersonaComponent } from './components/tabla-persona/tabla-persona.component';
import { BuscarPersonaComponent } from './components/buscar-persona/buscar-persona.component';
import { FiltradoPersonaComponent } from './components/filtrado-persona/filtrado-persona.component';
import { TipoUsuarioComponent } from './components/tipo-usuario/tipo-usuario.component';
import { TablaUsuarioComponent } from './components/tabla-usuario/tabla-usuario.component';
import { BuscarUsuarioComponent } from './components/buscar-usuario/buscar-usuario.component';
import { MantPersonaComponent } from './components/mant-persona/mant-persona.component';
import { FormPersonaComponent } from './components/form-persona/form-persona.component';
import { MantProductoComponent } from './components/mant-producto/mant-producto.component';
import { FormProductoComponent } from './components/form-producto/form-producto.component';
import { MantUserComponent } from './components/mant-user/mant-user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorLoginComponent } from './components/error-login/error-login.component';
import { ErrorPermisoLoginComponent } from './components/error-permiso-login/error-permiso-login.component';

//guards
import { SeguridadGuard } from './guards/seguridad.guard';
import { MantTipoUsuarioComponent } from './components/mant-tipo-usuario/mant-tipo-usuario.component';
import { FormTipoUsuarioComponent } from './components/form-tipo-usuario/form-tipo-usuario.component';
import { TablaTipoUsuarioComponent } from './components/tabla-tipo-usuario/tabla-tipo-usuario.component';
import { TablaPaginaComponent } from './components/tabla-pagina/tabla-pagina.component';
import { MantPaginaComponent } from './components/mant-pagina/mant-pagina.component';
import { FormPaginaComponent } from './components/form-pagina/form-pagina.component';
import { NoEncontroInfoComponent } from './components/no-encontro-info/no-encontro-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProductosComponent,
    BuscarProductoComponent,
    BuscarComponent,
    BuscarPCategoriaComponent,
    CategoriasComponent,
    TablaPersonaComponent,
    BuscarPersonaComponent,
    FiltradoPersonaComponent,
    TipoUsuarioComponent,
    TablaUsuarioComponent,
    BuscarUsuarioComponent,
    MantPersonaComponent,
    FormPersonaComponent,
    MantProductoComponent,
    FormProductoComponent,
    MantUserComponent,
    FormUserComponent,
    LoginComponent,
    ErrorLoginComponent,
    ErrorPermisoLoginComponent,
    MantTipoUsuarioComponent,
    FormTipoUsuarioComponent,
    TablaTipoUsuarioComponent,
    TablaPaginaComponent,
    MantPaginaComponent,
    FormPaginaComponent,
    NoEncontroInfoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      //{ path: '', component: HomeComponent, pathMatch: 'full', canActivate: [SeguridadGuard] },
      { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [SeguridadGuard] },
      { path: 'counter', component: CounterComponent, canActivate: [SeguridadGuard] },
      { path: 'productosCategoria', component: BuscarPCategoriaComponent, canActivate: [SeguridadGuard] },
      { path: 'productos', component: BuscarProductoComponent, canActivate: [SeguridadGuard] },
      { path: 'editproductos', component: MantProductoComponent, canActivate: [SeguridadGuard] },
      { path: 'editproductos/:id', component: FormProductoComponent, canActivate: [SeguridadGuard] },
      { path: 'personas', component: FiltradoPersonaComponent, canActivate: [SeguridadGuard] },
      { path: 'editpersonas', component: MantPersonaComponent, canActivate: [SeguridadGuard] },
      { path: 'editpersonas/:id', component: FormPersonaComponent, canActivate: [SeguridadGuard] },
      { path: 'usuarios', component: BuscarUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'edituser', component: MantUserComponent, canActivate: [SeguridadGuard] },
      { path: 'edituser/:id', component: FormUserComponent, canActivate: [SeguridadGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'errorlogin', component: ErrorLoginComponent, },
      { path: 'permisologin', component: ErrorPermisoLoginComponent, },
      { path: 'mant-tipoUsuario', component: MantTipoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'edittipoUsuario/:id', component: FormTipoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'tiposUsuarios', component: TablaTipoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'mant-pagina', component: MantPaginaComponent, canActivate: [SeguridadGuard]},
      { path: 'editPagina/:id', component: FormPaginaComponent, canActivate: [SeguridadGuard] },
      { path: 'Paginas', component: TablaPaginaComponent, canActivate: [SeguridadGuard]},
      { path: 'noInfo', component: NoEncontroInfoComponent, },
    ])
  ],
  providers: [ProductosService, CategoriaService, PersonaService, UsuarioService, SeguridadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
