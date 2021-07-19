using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppAgularTest.Classes;
using AppAgularTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppAgularTest.Controllers
{
    [Route("api/Pagina")]
    public class PaginaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("listarPaginasBD")]
        public List<PaginaDTO> listarPaginasBD()
        {
            List<PaginaDTO> paginas;
            try
            {
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    paginas = (from pagina in db.Pagina
                               where pagina.Bhabilitado == 1
                               select new PaginaDTO
                               {
                                   accion = pagina.Accion,
                                   bHabilitado = (int)pagina.Bhabilitado,
                                   mensaje = pagina.Mensaje,
                                   idPagina = pagina.Iidpagina
                               }).ToList();
                }
            }
            catch(Exception ex)
            {
                return null;
            }
            return paginas;
        }
        [HttpPost("guardarPagina")]
        public int guardarPagina([FromBody] PaginaDTO pagina)
        {
            int res = 0;
            try
            {
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    if (pagina.idPagina == 0)
                    {
                        db.Pagina.Add(new Pagina
                        {
                            Bhabilitado = 1,
                            Accion = pagina.accion,
                            Mensaje = pagina.mensaje,
                            Bvisible = pagina.bVisible
                        });
                        db.SaveChanges();
                        res = 1;
                    }
                    else
                    {
                        Pagina paginaDB = db.Pagina.Where(d => d.Iidpagina == pagina.idPagina).FirstOrDefault();
                        paginaDB.Mensaje = pagina.mensaje;
                        paginaDB.Accion = pagina.accion;
                        paginaDB.Bvisible = pagina.bVisible;
                        db.SaveChanges();
                        res = 1;
                    }
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
            return res;
        }
        [HttpGet("recuperarPagina/{idPagina}")]
        public PaginaDTO recuperarPagina(int idPagina)
        {
            PaginaDTO pagina;
            try
            {
                using (BDRestauranteContext db=new BDRestauranteContext())
                {
                    Pagina paginaDB = db.Pagina.Where(d => d.Iidpagina == idPagina).FirstOrDefault();
                    pagina = new PaginaDTO
                    {
                        idPagina = paginaDB.Iidpagina,
                        accion = paginaDB.Accion,
                        mensaje = paginaDB.Mensaje,
                        bVisible = (int)paginaDB.Bvisible
                    };
                }
            }
            catch(Exception ex)
            {
                return null;
            }
            return pagina;
        }
        [HttpGet("eliminarPagina/{idPagina}")]
        public int eliminarPagina(int idPagina)
        {
            int res=0;
            try
            {
                using (BDRestauranteContext db=new BDRestauranteContext())
                {
                    Pagina pagina = db.Pagina.Where(d => d.Iidpagina == idPagina).FirstOrDefault();
                    pagina.Bhabilitado = 0;
                    db.SaveChanges();
                    res = 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
            return res;
        }
    }
}
