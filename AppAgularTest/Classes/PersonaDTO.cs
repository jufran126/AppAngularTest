using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace AppAgularTest.Classes
{
    public class PersonaDTO
    {
        public int idPersona { get; set; }
        public string nombreCompleto { get; set; }
        public string telefono { get; set; }
        public string correo { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public int bHabilitadon { get; set; }
    }
}
