using System;
using System.Collections.Generic;

namespace AppAgularTest.Models
{
    public partial class Reserva
    {
        public Reserva()
        {
            DetalleVentaReserva = new HashSet<DetalleVentaReserva>();
        }

        public int Iidreserva { get; set; }
        public int? Iidpersonasolicita { get; set; }
        public int? Cantidadpersonas { get; set; }
        public int? Iidsede { get; set; }
        public DateTime? Fechareserva { get; set; }
        public string Telefonocontacto { get; set; }
        public string Observaciones { get; set; }
        public int? Bhabilitado { get; set; }
        public decimal? Total { get; set; }
        public int? Iidpersonaregistra { get; set; }

        public virtual Persona IidpersonaregistraNavigation { get; set; }
        public virtual Persona IidpersonasolicitaNavigation { get; set; }
        public virtual Sede IidsedeNavigation { get; set; }
        public virtual ICollection<DetalleVentaReserva> DetalleVentaReserva { get; set; }
    }
}
