using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using WebApplication9.Entities;

namespace WebApplication9.Data
{
    public class Seed
    {
        //The reason for using static is so that we can get access to the seed usrs without
        //creating a new instance of users
        public static async Task SeedUsers (DataContext context)
        {
            if(await context.Users.AnyAsync ()) { return; }
            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach ( var user in users )
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);


            }

            await context.SaveChangesAsync();
        }
    }
}
