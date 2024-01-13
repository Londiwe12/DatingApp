using AutoMapper;
using WebApplication9.DTOs;
using WebApplication9.Entities;
using WebApplication9.Extensions;

namespace WebApplication9.Helpers
{
    public class AutoMapperProfiles :Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, 
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src =>src.DateOfBirth.CalculateAge()));
            CreateMap<Photo,PhotoDto>();
           
        }
    }
}
