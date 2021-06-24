using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppAgularTest.Classes
{
    public class SeguridadDTO
    {
        public string clave { get; set; }
        public string valor { get; set; }
        public List<PaginaDTO> lista { get; set; }
    }
}
