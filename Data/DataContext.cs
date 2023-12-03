using Microsoft.EntityFrameworkCore;
using WebApplication9.Entities;

namespace WebApplication9.Data

{
    public class DataContext :DbContext
    {
        //constructor
        //when the new instance is called it calls the constructor
        public DataContext(DbContextOptions options) : base(options) 
        {


        }
        public DbSet<AppUser> Users { get; set; }
    }
}
