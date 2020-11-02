using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace AppAgularTest.Classes
{
    public class PersonaSaveDTO
    {
        public int idPersona { get; set; }
        public string nombre { get; set; }
        public string primerApellido { get; set; }
        public string segundoApellido { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public int telefono { get; set; }
        public string correo { get; set; }
        public string fechaCadena { get; set; }
     
    }
}
