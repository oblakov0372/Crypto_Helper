using Contracts;
using Data.Context;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class TradeFutureRepository : GenericRepository<TradeFutureEntity>, ITradeFutureRepository
    {
        public TradeFutureRepository(ProjectDBContext context) : base(context) { }
    }
}
