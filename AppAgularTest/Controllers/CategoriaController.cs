﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppAgularTest.Classes;
using AppAgularTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppAgularTest.Controllers
{
    [Route("api/Categoria")]
    public class CategoriaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("getCategorias")]
        public IEnumerable<CategoriaDTO> getCategoria()
        {
            List<CategoriaDTO> categorias = new List<CategoriaDTO>();
            using (BDRestauranteContext db= new BDRestauranteContext())
            {
                categorias = (from categoria in db.Categoria
                              where categoria.Bhabilitado == 1
                              select new CategoriaDTO
                              {
                                  idCategoria=categoria.Iidcategoria,
                                  nombre=categoria.Nombre
                              }).ToList();
            }
            return categorias;
        }
    }
}
