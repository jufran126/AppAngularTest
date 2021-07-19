using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using AppAgularTest.Classes;
using AppAgularTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppAgularTest.Controllers
{
    [Route("api/TipoUsuario")]
    public class TipoUsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("listarTiposUsuarios")]
        public List<TipoUsuarioDTO> listarTiposUsuarios()
        {
            List<TipoUsuarioDTO> tipoUsuarios;
            try
            {
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    tipoUsuarios = (from tipoUsuario in db.TipoUsuario
                                    where tipoUsuario.Bhabilitado == 1
                                    select new TipoUsuarioDTO
                                    {
                                        idTipoUsuario = tipoUsuario.Iidtipousuario,
                                        descripcion = tipoUsuario.Descripcion,
                                        nombre = tipoUsuario.Nombre,
                                        bhabilitado = (int)tipoUsuario.Bhabilitado
                                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return tipoUsuarios;
        }
        [HttpGet("listarPaginasTipoUsuario")]
        public List<PaginaDTO> listarPaginasTipoUsuario()
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
                                   mensaje = pagina.Mensaje,
                                   idPagina = pagina.Iidpagina
                               }).ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return paginas;
        }
        [HttpGet("recuperarTipoUsuario/{idTipoUsuario}")]
        public TipoUsuarioDTO recuperarTipoUsuario(int idTipoUsuario)
        {
            TipoUsuarioDTO tipoUsuarioR;
            try
            {
                using (BDRestauranteContext db=new BDRestauranteContext())
                { //from tipoUsuario in db.TipoUsuario     on tipoUsuario.Iidtipousuario equals paginaTU.Iidtipousuario
                    List<PaginaDTO> paginas = (from  paginaTU in db.PaginaTipoUsuario 
                                               join pagina in db.Pagina on paginaTU.Iidpagina equals pagina.Iidpagina
                                               where paginaTU.Iidtipousuario == idTipoUsuario && paginaTU.Bhabilitado == 1
                                               select new PaginaDTO
                                               {
                                                   idPagina = pagina.Iidpagina
                                               }).ToList();

                    TipoUsuario tipoUsuarioDB = db.TipoUsuario.Where(d => d.Iidtipousuario == idTipoUsuario).FirstOrDefault();
                    tipoUsuarioR = new TipoUsuarioDTO {
                        listaPagina=paginas,
                        nombre=tipoUsuarioDB.Nombre,
                        descripcion=tipoUsuarioDB.Descripcion,
                        idTipoUsuario=tipoUsuarioDB.Iidtipousuario
                    };
                }
            }
            catch(Exception ex)
            {
                return null;
            }
            return tipoUsuarioR;
        }
        [HttpPost("guardarTipoUsuario")]
        public int guardarTipoUsuario([FromBody] TipoUsuarioDTO tipoUsuario)
        {
            int res = 0;
            try
            {
                using (BDRestauranteContext db=new BDRestauranteContext())
                {
                    using (var transaccion=new TransactionScope())
                    {
                        if (tipoUsuario.idTipoUsuario == 0)
                        {
                            db.TipoUsuario.Add(new TipoUsuario
                            {
                                Bhabilitado = 1,
                                Nombre = tipoUsuario.nombre,
                                Descripcion = tipoUsuario.descripcion
                            });
                            db.SaveChanges();
                            int idTUAdd = (db.TipoUsuario.Where(d => d.Nombre.Equals(tipoUsuario.nombre)).FirstOrDefault()).Iidtipousuario;
                            var paginas = tipoUsuario.valores.Split("$");
                            foreach (var pagina in paginas)
                            {
                                db.PaginaTipoUsuario.Add(new PaginaTipoUsuario
                                {
                                    Bhabilitado = 1,
                                    Iidpagina = int.Parse(pagina),
                                    Iidtipousuario = idTUAdd
                                });
                            }
                            db.SaveChanges();
                            transaccion.Complete();
                            res = 1;
                        }
                        else
                        {
                            TipoUsuario tUsuario = db.TipoUsuario.Where(d => d.Iidtipousuario == tipoUsuario.idTipoUsuario).FirstOrDefault();
                            tUsuario.Nombre = tipoUsuario.nombre;
                            tUsuario.Descripcion = tipoUsuario.descripcion;
                            var paginas = tipoUsuario.valores.Split("$");
                            List<PaginaTipoUsuario> paginasDB = db.PaginaTipoUsuario.Where(d => d.Iidtipousuario == tipoUsuario.idTipoUsuario).ToList();
                            paginasDB.ForEach(d => { d.Bhabilitado = 0; });
                            int cantidad = 0;
                            foreach (var pgId in paginas)
                            {
                                cantidad = paginasDB.Where(d => d.Iidpagina == int.Parse(pgId)).Count();
                                if (cantidad == 0)
                                {
                                    db.PaginaTipoUsuario.Add(new PaginaTipoUsuario
                                    {
                                        Bhabilitado = 1,
                                        Iidpagina = int.Parse(pgId),
                                        Iidtipousuario = tipoUsuario.idTipoUsuario
                                    });
                                }
                                else
                                {
                                    PaginaTipoUsuario paginaTipoUsuario = paginasDB.Where(d => d.Iidpagina == int.Parse(pgId)).FirstOrDefault();
                                    paginaTipoUsuario.Bhabilitado = 1;
                                }
                            }
                            db.SaveChanges();
                            transaccion.Complete();
                            res = 1;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
            return res;
        }
        [HttpGet("eliminarTipoUsuario/{idTipoUsuario}")]
        public int eliminarTipoUsuario(int idTipoUsuario)
        {
            int res = 0;
            try
            {
                using (BDRestauranteContext db=new BDRestauranteContext())
                {
                    TipoUsuario tipoUsuario = db.TipoUsuario.Where(d => d.Iidtipousuario == idTipoUsuario).FirstOrDefault();
                    tipoUsuario.Bhabilitado = 0;
                    db.SaveChanges();
                    res = 1;
                }
            }
            catch(Exception ex)
            {
                return 0;
            }
            return res;
        }
    }
}
