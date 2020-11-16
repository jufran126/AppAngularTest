import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { ProductosService } from '../../services/productos.servicio';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {
  producto: FormGroup = new FormGroup({
    idProducto: new FormControl(0, [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    categoria: new FormControl("", [Validators.required]),
    precio: new FormControl(0, [Validators.required]),
    marca: new FormControl("", [Validators.required]),
    stock: new FormControl(0, [Validators.required, this.noPuntoDecimal])
  });
  titulo = 'nada';
  parametro='';
  categorias: any;
  marcas: any;
  constructor(private categoriaService: CategoriaService, private productosService: ProductosService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(par => {
      this.parametro = par["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Nuevo producto";
      }
      else {
        this.titulo = "Editar producto";
      }
    });
  }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data; 
    });
    this.categoriaService.getMarca().subscribe(data => {
      this.marcas = data;
    });
    if (this.parametro != "nuevo") {
      this.productosService.recuperarProducto(this.parametro).subscribe((data:any) => {
        this.producto.controls["idProducto"].setValue(data.idProducto);
        this.producto.controls["nombre"].setValue(data.nombre);
        this.producto.controls["categoria"].setValue(data.categoria);
        this.producto.controls["precio"].setValue(data.precio);
        this.producto.controls["marca"].setValue(data.marca);
        this.producto.controls["stock"].setValue(data.stock);
      });
    }
  }

  public guardarDatos() {
    if (this.producto.valid) {
      this.productosService.guardar(this.producto.value).subscribe(d => {
        if (d == 0) {
          alert("No se pudo guardar el producto");
        }
        else {
          this.router.navigate(['/editproductos']);
        }
      });
    }
  }

  noPuntoDecimal(control: FormControl) {
    if (control.value != null && control.value!="")
      if ((<string>control.value.toString()).indexOf(".") > -1) {
        return { puntoDecimal: true };
      }
    return null;
  }
}
