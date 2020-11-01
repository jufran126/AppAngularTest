using System;
using System.Collections.Generic;

namespace AppAgularTest.Models
{
    public partial class PaginaTipoUsuario
    {
        public int Iidpaginatipousuario { get; set; }
        public int? Iidpagina { get; set; }
        public int? Iidtipousuario { get; set; }
        public int? Bhabilitado { get; set; }

        public virtual Pagina IidpaginaNavigation { get; set; }
        public virtual TipoUsuario IidtipousuarioNavigation { get; set; }
    }
}
