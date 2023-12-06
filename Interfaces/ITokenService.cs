using WebApplication9.Entities;

namespace WebApplication9.Interfaces
{
    public interface ITokenService
    {
         string CreateToken(AppUser user);
    }
}
