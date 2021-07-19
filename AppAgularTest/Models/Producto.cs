using System;
using System.Collections.Generic;

namespace AppAgularTest.Models
{
    public partial class Producto
    {
        public Producto()
        {
            DetalleVentaReserva = new HashSet<DetalleVentaReserva>();
        }

        public int Iidproducto { get; set; }
        public string Nombre { get; set; }
        public decimal? Precio { get; set; }
        public int? Iidcategoria { get; set; }
        public int? Bhabilitado { get; set; }
        public int? Stock { get; set; }
        public int? Iidmarca { get; set; }
        public string Foto { get; set; }

        public virtual Categoria IidcategoriaNavigation { get; set; }
        public virtual Marca IidmarcaNavigation { get; set; }
        public virtual ICollection<DetalleVentaReserva> DetalleVentaReserva { get; set; }
    }
}
