using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class CoinEntity:BaseEntity
    {
        public string Name { get; set; }
        public string Price { get; set; }
    }
}
