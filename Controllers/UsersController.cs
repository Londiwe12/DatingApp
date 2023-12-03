using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication9.Data;
using WebApplication9.Entities;

namespace WebApplication9.Controllers
{
    [Route("api/[controller]")]
    [ApiController] // api/users
    public class UsersController : ControllerBase
       
    {
        private readonly DataContext _context;

        //create a new data context 
        public UsersController(DataContext context)
        {
            _context = context;
            
        }
        [HttpGet]
    
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;

        }
        [HttpGet("{id}")] // api/user/2
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }



    }
}
