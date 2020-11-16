using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppAgularTest.Classes
{
    public class ProductoSaveDTO
    {
        public int idProducto { get; set; }
        public string nombre { get; set; }
        public decimal precio { get; set; }
        public string categoria { get; set; }
        public string marca { get; set; }
        public int stock { get; set; }
        //public string nombreCategoria { get; set; }
        //public string nombreMarca { get; set; }
    }
}
