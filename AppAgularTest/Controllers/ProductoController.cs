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
                                 stock = (int)producto.Precio
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
    }
}
