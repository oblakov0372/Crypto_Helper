using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Context
{
    public class ProjectDBContext:DbContext
    {
        public DbSet<CoinEntity> Coins { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=OBLAKOV0372\\SQLEXPRESS;Database=CryptoProject;Trusted_Connection=True;");
        }
    }
}
