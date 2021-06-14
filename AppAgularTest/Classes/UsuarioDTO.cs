using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppAgularTest.Classes
{
    public class UsuarioDTO
    {
        public int idUsuario { get; set; }
        public string nombreUsuario { get; set; }
        public string nombrePersona { get; set; }
        public int bHabilitado { get; set; }
        public string nombreTiposUsuario { get; set; }
        public int idPersona { get; set; }
        public int idTipoUsuario { get; set; }
        public string contraseña { get; set; }
        public string contraseña2 { get; set; }
    }
}
