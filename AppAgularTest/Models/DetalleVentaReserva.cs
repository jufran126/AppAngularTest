using System;
using System.Collections.Generic;

namespace AppAgularTest.Models
{
    public partial class DetalleVentaReserva
    {
        public int Iiddetalleventa { get; set; }
        public int? Iidreserva { get; set; }
        public int? Iidproducto { get; set; }
        public int? Cantidad { get; set; }
        public decimal? Precio { get; set; }
        public decimal? Subtotal { get; set; }

        public virtual Producto IidproductoNavigation { get; set; }
        public virtual Reserva IidreservaNavigation { get; set; }
    }
}
