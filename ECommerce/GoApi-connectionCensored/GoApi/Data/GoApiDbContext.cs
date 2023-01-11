using GoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GoApi.Data
{
    public class GoApiDbContext : DbContext
    {
        public GoApiDbContext(DbContextOptions<GoApiDbContext>options):base(options)
        {

        }
      
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
    }

}
