using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication9.Data;
using WebApplication9.Entities;
using System;
using System.Security.Claims;

namespace WebApplication9.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return StatusCode(401, "secret test");
        }

    
        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound([FromQuery] int id)
        {
            var thing = _context.Users.Find(id);
            if (thing == null)
            {
                return NotFound();
            }
            return thing;
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var thing = _context.Users.Find(-1);
            if (thing == null)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
            var thingToReturn = thing.ToString();
            return thingToReturn;

        }

        [HttpPost("bad-request")]
        public ActionResult<string> GetBadRequestResult()
        {
            return StatusCode(400,"This was not a good request");
        }

        [HttpPost("test-validation")]
        public ActionResult<AppUser> TestValidation(AppUser user)
        {
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpGet("test-auth")]
        public ActionResult<string> TestAuth()
        {
            return "Authorization successful";
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("test-role")]
        public ActionResult<string> TestRole()
        {
            return "Role authorization successful";
        }

        [Authorize]
        [HttpGet("test-claims")]
        public ActionResult<string> TestClaims()
        {
            var username = User.Identity.Name;
            var userId = User.FindFirstValue("UserId");
            return $"Username: {username}, UserId: {userId}";
        }

        [Authorize]
        [HttpGet("test-policy")]
        [Authorize(Policy = "RequireEmail")]
        public ActionResult<string> TestPolicy()
        {
            return "Policy authorization successful";
        }
    }
}
