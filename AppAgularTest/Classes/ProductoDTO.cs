using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppAgularTest.Classes
{
    public class ProductoDTO
    {
        public int idProducto { get; set; }
        public string nombre { get; set; }
        public decimal precio { get; set; }
        public int stock { get; set; }
        public string nombreCategoria { get; set; }
        public string foto { get; set; }
    }
}
