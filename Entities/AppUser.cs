using System.ComponentModel.DataAnnotations;
using WebApplication9.DTOs;
using WebApplication9.Entities;
using WebApplication9.Extensions;

public class AppUser
{
    //Other classes can access that why we use "Public"
    public int Id { get; set; }
    [Required]
    public string UserName { get; set; }

    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }

    public DateTime DateOfBirth { get; set; }
    public string KnownAs { get; set; }
    public DateTime Created { get; set; }
    public DateTime LastActive { get; set; }
    public string Gender { get; set; }
    public string Introduction { get; set; }
    public string LookingFor { get; set; }
    public string Interests { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public List<Photo> Photos { get; set; } = new();

    public int Age
    {
        get { return DateOfBirth.CalculateAge(); }
    }
}
