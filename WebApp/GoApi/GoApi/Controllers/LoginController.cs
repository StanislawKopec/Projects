using GoApi.Data;
using GoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace GoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly GoApiDbContext datacontext;

        public LoginController(GoApiDbContext datacontext)
        {
            this.datacontext = datacontext;
        }


        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await datacontext.Users.ToListAsync());
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<User>>> GetUser(int id)
        {
            var user = await datacontext.Users.FindAsync(id);
            if(user == null)
            {
                return BadRequest("User not found");
            }
            return Ok(user);
        }

    }
}
