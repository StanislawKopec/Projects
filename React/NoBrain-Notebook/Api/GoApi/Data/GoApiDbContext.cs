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
        public DbSet<Node> Nodes { get; set; }
        public DbSet<NoteModel> Notes { get; set; }
    }

}
