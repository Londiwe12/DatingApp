using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore.Migrations;
using WebApplication9.Entities;
using System.Text.Json;

namespace WebApplication9.Data.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var userData = File.ReadAllText("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;

                migrationBuilder.InsertData(
                    table: "Users",
                    columns: new[] { "UserName", "PasswordHash", "PasswordSalt" , "City","Country","Created", "Gender","Interests","Introduction", "KnownAs","LastActive","LookingFor", },
                    values: new object[] { user.UserName, user.PasswordHash, user.PasswordSalt, user.City, user.Country, user.Created, user.Gender, user.Interests, user.Introduction, user.KnownAs, user.LastActive, user.LookingFor});
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Users");
        }
    }
}
