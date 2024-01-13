using Microsoft.EntityFrameworkCore;
using WebApplication9.Entities;

namespace WebApplication9.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           // base.OnModelCreating(modelBuilder);

           // modelBuilder.Entity<AppUser>()
           //     .Property(u => u.DateOfBirth)
               // .HasColumnName("DateOfBirth");
        }
    }
}
