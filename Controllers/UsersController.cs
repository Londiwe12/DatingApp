using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication9.Data;
using WebApplication9.DTOs;
using WebApplication9.Entities;
using WebApplication9.Interfaces;

namespace WebApplication9.Controllers
{
    [AllowAnonymous]
    public class UsersController : BaseApiController
       
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        //create a new data context 
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }


        [HttpGet]
    
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();


            return Ok(users);
           

        }
        [HttpGet("{username}")] // api/user/2
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }



    }
}
