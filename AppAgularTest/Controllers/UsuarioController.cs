using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
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
        [HttpGet("validarUsuario/{idUsuario}/{nombre}")]
        public int validarUsuario(int idUsuario, string nombre)
        {
            int res = 0;
            try
            {
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    if (idUsuario == 0)
                    {
                        res = db.Usuario.Where(d => d.Nombreusuario.ToLower().Equals(nombre.ToLower())).Count();
                    }
                    else
                    {
                        res = db.Usuario.Where(d => d.Nombreusuario.ToLower().Equals(nombre.ToLower()) && d.Iidusuario != idUsuario).Count();
                    }
                }
            }
            catch (Exception ex)
            {
                return -1;
            }
            return res;
        }
        [HttpGet("recuperarUsuario/{idUsuario}")]
        public UsuarioDTO recuperarUsuario(int idUsuario)
        {
            UsuarioDTO usuario;
            try
            {
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    Usuario user = db.Usuario.Where(d => d.Iidusuario == idUsuario).FirstOrDefault();
                    usuario = new UsuarioDTO
                    {
                        idUsuario = user.Iidusuario,
                        nombreUsuario = user.Nombreusuario,
                        idTipoUsuario = (int)user.Iidtipousuario
                    };
                }
            }
            catch(Exception ex)
            {
                return null;
            }
            return usuario;
        }   
        [HttpPost("guardarDatos")]
        public int guardarDatos([FromBody] UsuarioDTO usuario)
        {
            int res = 0;
            try
            {
                using (BDRestauranteContext db=new BDRestauranteContext())
                {
                    using(var transaccion=new TransactionScope())
                    {
                        if (usuario.idUsuario == 0)
                        {
                            SHA256Managed sha = new SHA256Managed();
                            byte[] contraNoCifrada = Encoding.Default.GetBytes(usuario.contraseña);
                            byte[] contraCifrada = sha.ComputeHash(contraNoCifrada);
                            string claveCifrada = BitConverter.ToString(contraCifrada).Replace("-", "");
                            Usuario user = new Usuario
                            {
                                Nombreusuario = usuario.nombreUsuario,
                                Contra = claveCifrada,
                                Iidpersona = usuario.idPersona,
                                Iidtipousuario = usuario.idTipoUsuario,
                                Bhabilitado = 1
                            };
                            db.Usuario.Add(user);

                            Persona persona = db.Persona.Where(d => d.Iidpersona == usuario.idPersona).FirstOrDefault();
                            db.SaveChanges();
                            transaccion.Complete();
                            res = 1;
                        }
                        else
                        {
                            Usuario user = db.Usuario.Where(d => d.Iidusuario == usuario.idUsuario).FirstOrDefault();
                            user.Nombreusuario = usuario.nombreUsuario;
                            user.Iidtipousuario = usuario.idTipoUsuario;
                            db.SaveChanges();
                            transaccion.Complete();
                            res = 1;    

                        }
                    }
                }
            }
            catch(Exception ex)
            {
                return -1;
            }
            return res;
        }
        [HttpGet("eliminarUsuario/{idUsuario}")]
        public int eliminarUsuario(int idUsuario)
        {
            int res = 0;
            try
            {
                using (BDRestauranteContext db=new BDRestauranteContext())
                {
                    Usuario usuario = db.Usuario.Where(d => d.Iidusuario == idUsuario).FirstOrDefault();
                    usuario.Bhabilitado = 0;
                    db.SaveChanges();
                    res = 1;
                }
            }
            catch(Exception ex)
            {
                res = -1;
            }
            return res;
        }
    }
}
