using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppAgularTest.Classes;
using AppAgularTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppAgularTest.Controllers
{
    [Route("api/Producto")]
    public class ProductoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("listProductos")]
        public IEnumerable<ProductoDTO> listProductos()
        {
            List<ProductoDTO> productos = new List<ProductoDTO>();
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                productos = (from producto in db.Producto
                             join categoria in db.Categoria
                             on producto.Iidcategoria equals categoria.Iidcategoria
                             where producto.Bhabilitado==1
                             select new ProductoDTO
                             {
                                 idProducto=producto.Iidproducto,
                                 nombre = producto.Nombre,
                                 nombreCategoria = categoria.Nombre,
                                 precio = (decimal)producto.Precio,
                                 stock = (int)producto.Stock
                             }).ToList();
            }
            return productos;
        }

        [HttpGet("listProductosFiltro/{nombre}")]
        public IEnumerable<ProductoDTO> listProductosFiltro(string nombre)
        {
            List<ProductoDTO> productos = new List<ProductoDTO>();
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                productos = (from producto in db.Producto
                             join categoria in db.Categoria
                             on producto.Iidcategoria equals categoria.Iidcategoria
                             where producto.Bhabilitado==1 && producto.Nombre.ToLower().Contains(nombre.ToLower())
                             select new ProductoDTO
                             {
                                 idProducto = producto.Iidproducto,
                                 nombre = producto.Nombre,
                                 nombreCategoria = categoria.Nombre,
                                 precio = (decimal)producto.Precio,
                                 stock = (int)producto.Precio
                             }).ToList();
            }
            return productos;
        }

        [HttpGet("listProductosCategoria/{id}")]
        public IEnumerable<ProductoDTO> listProductosCategoria(int id)
        {
            List<ProductoDTO> productos = new List<ProductoDTO>();
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                productos = (from producto in db.Producto
                             join categoria in db.Categoria
                             on producto.Iidcategoria equals categoria.Iidcategoria
                             where producto.Iidcategoria == id
                             select new ProductoDTO
                             {
                                 idProducto = producto.Iidproducto,
                                 nombre = producto.Nombre,
                                 nombreCategoria = categoria.Nombre,
                                 precio = (decimal)producto.Precio,
                                 stock = (int)producto.Precio
                             }).ToList();
            }
            return productos;
        }
        [HttpGet("recuperarProducto/{id}")]
        public ProductoSaveDTO recuperarProducto(int id)
        {
            ProductoSaveDTO persona;
            using (BDRestauranteContext db=new BDRestauranteContext())
            {
                persona = (from producto in db.Producto
                           join categoria in db.Categoria
                           on producto.Iidcategoria equals categoria.Iidcategoria
                           join marca in db.Marca
                           on producto.Iidmarca equals marca.Iidmarca
                           where producto.Bhabilitado == 1 && producto.Iidproducto == id
                           select new ProductoSaveDTO {
                               idProducto = producto.Iidproducto,
                               nombre = producto.Nombre,
                               precio = (decimal)producto.Precio,
                               //nombreCategoria = categoria.Nombre,
                               categoria = Convert.ToString(categoria.Iidcategoria),
                               //nombreMarca = marca.Nombre,
                               marca = Convert.ToString(marca.Iidmarca),
                               stock = (int)producto.Stock
                           }).First();
            }
            return persona;
        }
        [HttpPost("guardarProducto")]
        public int guardarProducto([FromBody] ProductoSaveDTO producto)
        {
            int resp = 0;
            try
            {
                using (BDRestauranteContext db=new BDRestauranteContext())
                {
                    if (producto.idProducto == 0)
                    {
                        Producto producto1 = new Producto
                        {
                            Nombre = producto.nombre,
                            Precio = producto.precio,
                            Stock = producto.stock,
                            Iidcategoria = Convert.ToInt32(producto.categoria),
                            Iidmarca = Convert.ToInt32(producto.marca),
                            Bhabilitado = 1
                        };
                        db.Producto.Add(producto1);
                        db.SaveChanges();
                        resp = 1;
                    }
                    else
                    {
                        Producto producto1 = db.Producto.Where(d => d.Iidproducto == producto.idProducto).First();
                        producto1.Nombre = producto.nombre;
                        producto1.Precio = producto.precio;
                        producto1.Stock = producto.stock;
                        producto1.Iidcategoria = Convert.ToInt32(producto.categoria);
                        producto1.Iidmarca = Convert.ToInt32(producto.marca);
                        producto1.Bhabilitado = 1;
                        db.SaveChanges();
                        resp = 1;
                    }
                }
            }
            catch(Exception ex)
            {
                resp = 0;
            }
            return resp;
        }
        [HttpGet("eliminarProducto/{id}")]
        public int eliminarProducto(int id)
        {
            int resp = 0;
            try
            {
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    Producto producto = db.Producto.Where(p => p.Iidproducto == id).FirstOrDefault();
                    producto.Bhabilitado = 0;
                    db.SaveChanges();
                    resp = 1;
                }
            }
            catch(Exception ex)
            {
                resp = 0;
            }
            return resp;
        }
    }
}
