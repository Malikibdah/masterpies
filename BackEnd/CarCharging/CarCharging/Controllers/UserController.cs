using CarCharging.DTO;
using CarCharging.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace CarCharging.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _db;
        public UserController(MyDbContext db)
        {
            _db = db;
        }
        [HttpPost("UserRegester")]
        public IActionResult UserRegester([FromForm] UserRegesterDTO userRegesterDTO)
        {
            byte[] passwordHash, passwordSalt;

            PasswordHasher.CreatePasswordHash(userRegesterDTO.Password, out passwordHash, out passwordSalt);
            var user = new User
            {
                UserName = userRegesterDTO.UserName,
                Email = userRegesterDTO.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                PhonrNumber = 07,
                CarPlateNumber = 001,
                City = "City",
                Street = "Street",
            };
            _db.Users.Add(user);
            _db.SaveChanges();
            
            return Ok(user);
        }
        [HttpPost("UserLogin")]
        public IActionResult Login([FromForm] UserRegesterDTO userRegesterDTO)
        {
            var user = _db.Users.FirstOrDefault(x => x.Email == userRegesterDTO.Email);
            if (user == null || !PasswordHasher.VerifyPasswordHash(userRegesterDTO.Password, user.PasswordHash, user.PasswordSalt))
            {
                return Unauthorized("Invalid username or password."); ;

            };
            return Ok(user);
        }
        [HttpPut("ResetUserPassword")]
        public IActionResult ResetPassword([FromBody] resetPasswordDTO newpass)
        {
            var user = _db.Users.Where(u => u.Email == newpass.Email).FirstOrDefault();
            if (user == null)
            {
                return BadRequest();
            }
            byte[] newHash, newSalt;
            PasswordHasher.CreatePasswordHash(newpass.Password, out newHash, out newSalt);
            user.PasswordHash = newHash;
            user.PasswordSalt = newSalt;
            _db.Users.Update(user);
            _db.SaveChanges();
            return Ok(user);
        }

    }
}
