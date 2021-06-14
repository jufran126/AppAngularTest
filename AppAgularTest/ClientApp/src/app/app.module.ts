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
    FormUserComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'productosCategoria', component: BuscarPCategoriaComponent },
      { path: 'productos', component: BuscarProductoComponent },
      { path: 'editproductos', component: MantProductoComponent },
      { path: 'editproductos/:id', component: FormProductoComponent },
      { path: 'personas', component: FiltradoPersonaComponent },
      { path: 'editpersonas', component: MantPersonaComponent },
      { path: 'editpersonas/:id', component: FormPersonaComponent },
      { path: 'usuarios', component: BuscarUsuarioComponent },
      { path: 'edituser', component: MantUserComponent },
      { path: 'edituser/:id', component: FormUserComponent },
    ])
  ],
  providers: [ProductosService, CategoriaService, PersonaService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
