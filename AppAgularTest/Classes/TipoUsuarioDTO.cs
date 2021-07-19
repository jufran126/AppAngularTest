using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppAgularTest.Classes
{
    public class TipoUsuarioDTO
    {
        public int idTipoUsuario { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public int bhabilitado { get; set; }
        public string valores { get; set; } 
        public List<PaginaDTO> listaPagina { get; set; }
    }
}
