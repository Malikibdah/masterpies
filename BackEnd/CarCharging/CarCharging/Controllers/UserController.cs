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
           
            var existingUser = _db.Users.FirstOrDefault(u => u.Email == userRegesterDTO.Email);
            if (existingUser != null)
            {
                return BadRequest("Email already exists");
            }
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
        public IActionResult Login([FromForm] UserLoginRequestDTO userLoginRequestDTO)
        {
            var user = _db.Users.FirstOrDefault(x => x.Email == userLoginRequestDTO.Email);
            if (user == null || !PasswordHasher.VerifyPasswordHash(userLoginRequestDTO.Password, user.PasswordHash, user.PasswordSalt))
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
        [HttpGet("UserProfileInfo /{id}")]
        public IActionResult UserProfileInfo(int id)
        {
            if (id == null || id == 0)
            {
                return BadRequest("The id is null or 0 here");
            }
            var user = _db.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            var profile = new UserProfileInfoDTO
            {
                UserName = user.UserName,
                Email = user.Email,
                PhonrNumber = user.PhonrNumber,
                CarPlateNumber = user.CarPlateNumber,
                City = user.City,
                Street = user.Street,
                Image = user.Image
            };

            return Ok(profile);

        }
        [HttpPut("UpdateUserProfile/{id}")]
        public IActionResult UpdateUserProfile(int id, [FromForm] EditUserProfileInfoDTO editUserProfileInfoDTO)
        {
            if (id == null || id == 0)
            {
                return BadRequest("The id is null or 0 here");
            }
            var user = _db.Users.FirstOrDefault(c => c.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            user.UserName = editUserProfileInfoDTO.UserName ?? user.UserName;
            user.CarPlateNumber = editUserProfileInfoDTO.CarPlateNumber ?? user.CarPlateNumber;
            user.PhonrNumber = editUserProfileInfoDTO.PhonrNumber ?? user.PhonrNumber;
            user.City = editUserProfileInfoDTO.City ?? user.City;
            user.Street = editUserProfileInfoDTO.Street ?? user.Street;
            user.Image = editUserProfileInfoDTO.Image?.FileName ?? user.Image;
            _db.Users.Update(user);
            _db.SaveChanges();
            return Ok();
        }
        [HttpPost("AddTestimonial/{id}")]
        public IActionResult Addtestimonial(int id, [FromBody] AddtestimonialDTO addtestimonialDTO)
        {
            if (id == null || id == 0)
            {
                return BadRequest("The id is null or 0 here");
            }

            var user = _db.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var addtestimonial = new Testimonial
            {
                UserId = id,
                UserName = user.UserName,
                Email = user.Email,
                TheTestimonial = addtestimonialDTO.TheTestimonial
            };
            _db.Testimonials.Add(addtestimonial);
            _db.SaveChanges();
            return Ok();
        }
        [HttpGet("GetAllAcceptedTestimonial")]
        public IActionResult GetAllAcceptedTestimonial()
        {
            var testmonials = _db.Testimonials.Where(a => a.IsAccepted == true).ToList();
            var lesttestimonial = new List<GetAcceptTestimonialDTO>();
            foreach (var item in testmonials)
            {
                var accepttestimonial = new GetAcceptTestimonialDTO
                {
                    UserName = item.UserName,
                    TheTestimonial = item.TheTestimonial,
                };
                lesttestimonial.Add(accepttestimonial);
            }

            return Ok(lesttestimonial);

        }
        [HttpPost("AddContactMessage")]
        public IActionResult AddContactMessage([FromForm] ContactMessageDTO contactMessageDTO)
        {
            var contactMessage = new Contactu
            {
                Email = contactMessageDTO.Email,
                Subject = contactMessageDTO.Subject,
                Message = contactMessageDTO.Message
            };
            _db.Contactus.Add(contactMessage);
            _db.SaveChanges();
            return Ok();
        }
        [HttpGet("GetAllVehiclechargingrequestsByUserId/{id}")]
        public IActionResult GetAllAcceptVehiclechargingrequests(int id)
        {
            var acceptvehicleChargings = _db.VehicaleChargings
                .Where(w => w.UserId == id)
                .OrderByDescending(w => w.Date)
                .Select(s => new
                {
                    s.PhoneNumber,
                    s.CarPlateNumber,
                    s.CarType,
                    s.Status,
                    s.User.UserName
                })
                .ToList();
            return Ok(acceptvehicleChargings);
        }
        [HttpGet("GetAllDeliveryChargerRequestsByUserId/{id}")]
        public IActionResult GetAcceptAllDeliveryChargerRequests(int id)
        {
            var acceptdeliveryChargers = _db.DeliveryChargers
                .Where(w => w.UserId == id)
                .OrderByDescending(w => w.Status)
                .Select(s => new
                {
                    s.PhoneNumber,
                    s.CarPlateNumber,
                    s.CarType,
                    s.Status,
                    s.User.UserName
                })
                .ToList();
            return Ok(acceptdeliveryChargers);
        }
        [HttpGet("GetAllComputerCheckRequestsByUserId/{id}")]
        public IActionResult GetAcceptAllComputerCheckRequests(int id)
        {
            var acceptcomputerChecks = _db.ComputerChecks
                .Where(w => w.UserId == id)
                .OrderByDescending(w => w.Status)
                .Select(s => new
                {
                    s.PhoneNumber,
                    s.CarPlateNmber,
                    s.CarType,
                    s.Status,
                    s.User.UserName
                })
                .ToList();
            return Ok(acceptcomputerChecks);
        }
    }
}
