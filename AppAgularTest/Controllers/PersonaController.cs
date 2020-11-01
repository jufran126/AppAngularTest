using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppAgularTest.Classes;
using AppAgularTest.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;

namespace AppAgularTest.Controllers
{
    [Route("api/Persona")]
    public class PersonaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("getPersona")]
        public IEnumerable<PersonaDTO> getPersona()
        {
            List<PersonaDTO> personas;
            using(BDRestauranteContext db= new BDRestauranteContext())
            {
                personas = (from persona in db.Persona
                            where persona.Bhabilitado == 1
                            select new PersonaDTO
                            {
                                idPersona=persona.Iidpersona,
                                bHabilitadon=(int)persona.Bhabilitado,
                                correo=persona.Correo,
                                telefono=persona.Telefono,
                                fechaNacimiento=(DateTime)persona.Fechanacimiento,
                                nombreCompleto=persona.Nombre+" "+persona.Appaterno+" "+persona.Apmaterno
                            }).ToList();
            }
            return personas;
        }
        [HttpGet("filtrarPersona/{nombre?}")]
        public IEnumerable<PersonaDTO> filtrarPersona(string nombre="")
        {
            List<PersonaDTO> personas;
            if (string.IsNullOrEmpty(nombre))
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    personas = (from persona in db.Persona
                                where persona.Bhabilitado == 1
                                select new PersonaDTO
                                {
                                    idPersona = persona.Iidpersona,
                                    bHabilitadon = (int)persona.Bhabilitado,
                                    correo = persona.Correo,
                                    telefono = persona.Telefono,
                                    fechaNacimiento = (DateTime)persona.Fechanacimiento,
                                    nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno
                                }).ToList();
                }
            else
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    personas = (from persona in db.Persona
                                where persona.Bhabilitado == 1 && 
                                (persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno).ToLower().Contains(
                                    nombre.ToLower())
                                select new PersonaDTO
                                {
                                    idPersona = persona.Iidpersona,
                                    bHabilitadon = (int)persona.Bhabilitado,
                                    correo = persona.Correo,
                                    telefono = persona.Telefono,
                                    fechaNacimiento = (DateTime)persona.Fechanacimiento,
                                    nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno
                                }).ToList();
                }
            return personas;
        }
        [HttpPost("guardarPersona")]
        public int guardarPersona([FromBody] PersonaSaveDTO personaDTO)
        {
            if (personaDTO == null)
                return 0;
            int respuesta = 0;
            try
            {
                using(BDRestauranteContext db=new BDRestauranteContext())
                {
                    Persona persona = new Persona
                    {
                        Nombre = personaDTO.nombre.ToUpper(),
                        Apmaterno = personaDTO.segundoApellido.ToUpper(),
                        Appaterno = personaDTO.primerApellido.ToUpper(),
                        Correo = personaDTO.correo,
                        Telefono = Convert.ToString(personaDTO.telefono),
                        Fechanacimiento = personaDTO.fechaNacimiento,
                        Bhabilitado = 1,
                        Btieneusuario = 0
                    };
                    db.Persona.Add(persona);
                    db.SaveChanges();
                    respuesta = 1;
                }
            }
            catch(Exception ex)
            {
                respuesta = 0;
            }
            return respuesta;
        }
        [HttpGet("recuperarPersona/{id}")]
        public PersonaSaveDTO recuperarPersona(int id)
        {
            PersonaSaveDTO persona;
            using (BDRestauranteContext db = new BDRestauranteContext())
                persona = (from person in db.Persona
                           where person.Iidpersona == id
                           select new PersonaSaveDTO
                           {
                               idPersona=person.Iidpersona,
                               nombre = person.Nombre,
                               primerApellido = person.Appaterno,
                               segundoApellido = person.Apmaterno,
                               fechaNacimiento = (DateTime)person.Fechanacimiento,
                               correo = person.Correo,
                               telefono=Convert.ToInt32(person.Telefono)
                           }).First();
            return persona;
        }
    }
}
