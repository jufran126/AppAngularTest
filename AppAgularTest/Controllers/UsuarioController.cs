using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppAgularTest.Classes;
using AppAgularTest.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppAgularTest.Controllers
{
    [Route("api/Usuario")]
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("tipoUsuarios")]
        public IEnumerable<TipoUsuarioDTO> tipoUsuarios()
        {
            List<TipoUsuarioDTO> tipos;
            using (BDRestauranteContext db = new BDRestauranteContext())
                tipos = (from tiposU in db.TipoUsuario
                         where tiposU.Bhabilitado == 1
                         select new TipoUsuarioDTO
                         {
                             idTipoUsuario = tiposU.Iidtipousuario,
                             nombre = tiposU.Nombre
                         }).ToList();
            return tipos;
        }
        [HttpGet("getUsuarios")]
        public IEnumerable<UsuarioDTO> getUsuarios()
        {
            List<UsuarioDTO> usuarios;
            using (BDRestauranteContext db = new BDRestauranteContext())
                usuarios = (from usuario in db.Usuario
                         join tUsuario in db.TipoUsuario on usuario.Iidtipousuario equals tUsuario.Iidtipousuario
                         join persona in db.Persona on usuario.Iidpersona equals persona.Iidpersona
                         where usuario.Bhabilitado==1
                         select new UsuarioDTO { 
                            bHabilitado=(int)usuario.Bhabilitado,
                            idUsuario=(int)usuario.Iidusuario,
                            nombrePersona=persona.Nombre+" "+persona.Appaterno+" "+persona.Apmaterno,
                            nombreTiposUsuario=tUsuario.Nombre,
                            nombreUsuario=usuario.Nombreusuario
                         }).ToList();
            return usuarios;
        }
        [HttpGet("filtrarUsuarios/{idUsuario}")]
        public IEnumerable<UsuarioDTO> filtrarUsuarios(int idUsuario)
        {
            List<UsuarioDTO> usuarios;
            using (BDRestauranteContext db = new BDRestauranteContext())
                usuarios = (from usuario in db.Usuario
                            join tUsuario in db.TipoUsuario on usuario.Iidtipousuario equals tUsuario.Iidtipousuario
                            join persona in db.Persona on usuario.Iidpersona equals persona.Iidpersona
                            where usuario.Bhabilitado == 1 && usuario.Iidusuario == idUsuario
                            select new UsuarioDTO
                            {
                                bHabilitado = (int)usuario.Bhabilitado,
                                idUsuario = (int)usuario.Iidusuario,
                                nombrePersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                nombreTiposUsuario = tUsuario.Nombre,
                                nombreUsuario = usuario.Nombreusuario
                            }).ToList();
            return usuarios;
        }
    }
}
