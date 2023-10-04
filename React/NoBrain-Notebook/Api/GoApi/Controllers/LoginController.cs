using GoApi.Data;
using GoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Runtime.CompilerServices;
using System.Xml.Linq;

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

        [Route("GetUsers")]
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await datacontext.Users.ToListAsync());
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<User>>> GetUser(int id)
        {
            var user = await datacontext.Users.FindAsync(id);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            return Ok(user);
        }
        [Route("CheckUsername/{username}")]
        [HttpGet]
        public async Task<ActionResult<bool>> CheckUsername(string username)
        {
            try
            {
                var user = await datacontext.Users
                                         .Where(p => p.username == username)
                                         .FirstOrDefaultAsync();
                if (user != null)
                {
                    return Ok(false);
                }
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{username}/{password}")]
        public async Task<ActionResult> Login(string username, string password)
        {
            try
            {
                var user = await datacontext.Users
                                     .Where(p => p.username == username)
                                     .FirstOrDefaultAsync();
                if (user != null)
                {
                    string compare = BCrypt.Net.BCrypt.HashPassword(password, user.salt);
                    if (compare == user.password)
                    {
                        return Ok(user.username);
                    }
                    else
                        return Problem("Wrong username or password");
                }
                else return Problem("No users");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("register")]
        [HttpPost]
        public async Task<ActionResult> Register(RegisterUserJson userData)
        {
            try
            {
                User? user1 = null;
                user1 = await datacontext.Users
                                     .Where(p => p.username == userData.username)
                                     .FirstOrDefaultAsync();
                if (user1 == null)
                {
                    string salt = BCrypt.Net.BCrypt.GenerateSalt(6);
                    var password = BCrypt.Net.BCrypt.HashPassword(userData.password, salt);
                    User user = new User() { salt = salt, password = password, username = userData.username };
                    await datacontext.Users.AddAsync(user);
                    datacontext.SaveChanges();
                    return Ok();
                }
                return Problem("User already exists");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, userData.password);
            }
        }
    }
}
