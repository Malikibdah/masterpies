using CarCharging.DTO;
using CarCharging.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CarCharging.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _db;
        public AdminController(MyDbContext db)
        {
            _db = db;
        }
        [HttpPost("AdminLogin")]
        public IActionResult AdminLogin([FromForm] AdminloginDTO adminLoginDTO)
        {
            var admin = _db.Admins.FirstOrDefault(x => x.Email == adminLoginDTO.Email && x.Password == adminLoginDTO.Password);
            if (admin == null)
            {
                return Unauthorized("Invalid username or password.");
            }
            return Ok(admin);
        }
        [HttpGet("GetAdminInfo/{id}")]
        public IActionResult GetAdminInfo(int id)
        {
            if (id == null || id <= 0)
            {
                return BadRequest("You can not use null or 0 or negative value for id");
            }

            var admin = _db.Admins.FirstOrDefault(x => x.Id == id);
            return Ok(admin);
        }
        [HttpPut("UpdateAdminInfo/{id}")]
        public IActionResult UpdateAdminInfo(int id, [FromForm] UpdateAdminDTO updateAdminDTO)
        {
            if (id == null || id <= 0)
            {
                return BadRequest("You can not use null or 0 or negative value for id");
            }

            var admin = _db.Admins.FirstOrDefault(x => x.Id == id);
            if (admin == null)
                return NotFound();
            admin.AdminName = updateAdminDTO.AdminName ?? admin.AdminName;
            admin.Email = updateAdminDTO.Email ?? admin.Email;
            admin.Address = updateAdminDTO.Address ?? admin.Address;
            admin.PhoneNumber = updateAdminDTO.PhoneNumber ?? admin.PhoneNumber;
            admin.Image = updateAdminDTO.Image?.FileName ?? admin.Image;
            _db.Admins.Update(admin);
            _db.SaveChanges();
            return Ok();
        }
        [HttpPut("ResetAdminPassword/{id}")]
        public IActionResult ResetAdminPassword(int id, [FromBody] ResetAdminPasswordDTO resetAdminPasswordDTO)
        {
            if (id == null || id <= 0)
            {
                return BadRequest("You can not use null or 0 or negative value for id");
            }
            var admin = _db.Admins.FirstOrDefault(x => x.Id == id);
            if (admin == null)
                return NotFound();
            admin.Password = resetAdminPasswordDTO.Password;
            _db.Admins.Update(admin);
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet("GetAllEmployee")]
        public IActionResult GetAllEmployee()
        {
            var employees = _db.Employees.ToList();

            return Ok(employees);
        }

        [HttpPost("AddNewEmployee")]
        public IActionResult AddNewEmployee([FromForm] AddEmployeeDTO addEmployeeDTO)
        {
            var uploadFile = @"C:\Users\Orange\Desktop\masterpies\masterpies\car_charging\img";
            //var uploadFile = Path.Combine(Directory.GetCurrentDirectory(@"C: \Users\Orange\Desktop\masterpies\masterpies\car_charging"), "img");
            if (!Directory.Exists(uploadFile))
            {
                Directory.CreateDirectory(uploadFile);
            }
            var imgFile = Path.Combine(uploadFile, addEmployeeDTO.Image.FileName);
            using (var steam = new FileStream(imgFile, FileMode.Create))
            {
                addEmployeeDTO.Image.CopyTo(steam);
            }

            var newEmployee = new Employee
            {
                EmpName = addEmployeeDTO.EmpName,
                EmployeeId = addEmployeeDTO.EmployeeId,
                Salary = addEmployeeDTO.Salary,
                Jobtitle = addEmployeeDTO.Jobtitle,
                PhoneNumber = addEmployeeDTO.PhoneNumber,
                EmergencyNumber = addEmployeeDTO.EmergencyNumber,
                Image = addEmployeeDTO.Image.FileName
            };
            _db.Employees.Add(newEmployee);
            _db.SaveChanges();
            return Ok();
        }

        [HttpPut("UpdateEmployee/{id}")]
        public IActionResult UpdateEmployee(int id, [FromForm] UpdateEmployeeDTO updateEmployeeDTO)
        {
            if (id == null || id <= 0)
            {
                return BadRequest("You can not use null or 0 or negative value for id");
            }


            if (updateEmployeeDTO.Image != null)
            {
                var uploadFile = @"C:\Users\Orange\Desktop\masterpies\masterpies\car_charging\img";

                if (!Directory.Exists(uploadFile))
                {
                    Directory.CreateDirectory(uploadFile);
                }
                var imgFile = Path.Combine(uploadFile, updateEmployeeDTO.Image.FileName);
                using (var steam = new FileStream(imgFile, FileMode.Create))
                {
                    updateEmployeeDTO.Image.CopyTo(steam);
                }

            }
            var c = _db.Employees.FirstOrDefault(m => m.Id == id);
            c.EmpName = updateEmployeeDTO.EmpName ?? c.EmpName;
            c.EmployeeId = updateEmployeeDTO.EmployeeId ?? c.EmployeeId;
            //C.EmployeeId = updateEmployeeDTO.EmployeeId != 0 ? updateEmployeeDTO.EmployeeId : C.EmployeeId; 
            c.Salary = updateEmployeeDTO.Salary ?? c.Salary;
            c.Jobtitle = updateEmployeeDTO.Jobtitle ?? c.Jobtitle;
            c.PhoneNumber = updateEmployeeDTO.PhoneNumber ?? c.PhoneNumber;
            c.EmergencyNumber = updateEmployeeDTO.EmergencyNumber ?? c.EmergencyNumber;
            c.Image = updateEmployeeDTO.Image?.FileName ?? c.Image;
            _db.Employees.Update(c);
            _db.SaveChanges();

            return Ok();
        }

        [HttpDelete("DeleteEmployee/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            if (id == null || id <= 0)
            {
                return BadRequest("You can not use null or 0 or negative value for id");
            }
            var employee = _db.Employees.FirstOrDefault(m => m.Id == id);
            if (employee == null)
            {
                return NotFound();
            }
            _db.Employees.Remove(employee);
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet("GetAllProjects")]
        public IActionResult GetAllProjects()
        {
            var projects = _db.Projects.ToList();
            return Ok(projects);
        }

        [HttpPost("AddNewProject")]
        public IActionResult AddNewProject([FromForm] AddProjectDTO addProjectDTO)
        {
            var uploadFile = @"C:\Users\Orange\Desktop\masterpies\masterpies\car_charging\img";
            if (!Directory.Exists(uploadFile))
            {
                Directory.CreateDirectory(uploadFile);
            }
            var imgFile = Path.Combine(uploadFile, addProjectDTO.Image.FileName);
            using (var steam = new FileStream(imgFile, FileMode.Create))
            {
                addProjectDTO.Image.CopyTo(steam);
            }


            var project = new Project
            {
                ProjectName = addProjectDTO.ProjectName,
                Image = addProjectDTO.Image.FileName
            };
            _db.Projects.Add(project);
            _db.SaveChanges();
            return Ok();
        }

        [HttpPut("UpdateProject/{id}")]
        public IActionResult UpdateProject(int id, [FromForm] UpdateProjectDTO updateProjectDTO)
        {
            if (id == null || id <= 0)
            {
                return BadRequest("You can not use null or 0 or negative value for id  ");
            }
            if (updateProjectDTO.Image != null)
            {
                var uploadFile = @"C:\Users\Orange\Desktop\masterpies\masterpies\car_charging\img";

                if (!Directory.Exists(uploadFile))
                {
                    Directory.CreateDirectory(uploadFile);
                }
                var imgFile = Path.Combine(uploadFile, updateProjectDTO.Image.FileName);
                using (var steam = new FileStream(imgFile, FileMode.Create))
                {
                    updateProjectDTO.Image.CopyTo(steam);
                }

            }

            var project = _db.Projects.FirstOrDefault(p => p.Id == id);
            if (project == null)
            {
                return NotFound();
            }
            project.ProjectName = updateProjectDTO.ProjectName ?? project.ProjectName;
            project.Image = updateProjectDTO.Image?.FileName ?? project.Image;
            _db.Projects.Update(project);
            _db.SaveChanges();

            return Ok();
        }

        [HttpDelete("DeleteProject/{id}")]
        public IActionResult DeleteProject(int id)
        {
            if (id <= 0 || id == null)
            {
                return BadRequest("You can not use null or 0 or negative value for id");
            }

            var project = _db.Projects.FirstOrDefault(x => x.Id == id);
            if (project == null)
            {
                return NotFound();
            }
            _db.Projects.Remove(project);
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet("GetAllServices")]
        public IActionResult GetAllServices()
        {
            var services = _db.Services.ToList();
            return Ok(services);
        }

        [HttpPut("UpdateService/{id}")]
        public IActionResult UpdateService(int id, [FromForm] UpdateServiceDTO updateServiceDTO)
        {
            if (id == null || id <= 0)
            {
                return BadRequest("You can not use null or 0 or negative value for id");
            }
            if (updateServiceDTO.Image != null)
            {
                var uploadFile = @"C:\Users\Orange\Desktop\masterpies\masterpies\car_charging\img";

                if (!Directory.Exists(uploadFile))
                {
                    Directory.CreateDirectory(uploadFile);
                }
                var imgFile = Path.Combine(uploadFile, updateServiceDTO.Image.FileName);
                using (var steam = new FileStream(imgFile, FileMode.Create))
                {
                    updateServiceDTO.Image.CopyTo(steam);
                }

            }
            var service = _db.Services.FirstOrDefault(n => n.Id == id);
            if (service == null)
            {
                return NotFound();
            }

            service.ServiceName = updateServiceDTO.ServiceName ?? service.ServiceName;
            service.Description = updateServiceDTO.Description ?? service.Description;
            service.Image = updateServiceDTO.Image?.FileName ?? service.Image;
            _db.Services.Update(service);
            _db.SaveChanges();
            return Ok();
        }
        [HttpPut("HiddenServiceById/{id}")]
        public IActionResult HiddenServiceById(int id)
        {
            var service = _db.Services.FirstOrDefault(s => s.Id == id);
            if (service == null)
            {
                return NotFound();
            }
            service.IsHidden = true;
            _db.Services.Update(service);
            _db.SaveChanges();
            return Ok();

        }
        [HttpPut("UnhiddenServiceById/{id}")]
        public IActionResult UnhiddenServiceById(int id)
        {
            var service = _db.Services.FirstOrDefault(s => s.Id == id);
            if (service == null)
            {
                return NotFound();
            }
            service.IsHidden = false;
            _db.Services.Update(service);
            _db.SaveChanges();
            return Ok();

        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var users = _db.Users.ToList();

            var lestUsers = new List<GetAllUsersDTO>();

            foreach (var item in users)
            {
                var user = new GetAllUsersDTO
                {
                    Id = item.Id,

                    UserName = item.UserName,

                    Email = item.Email,

                    PhonrNumber = item.PhonrNumber,

                    CarPlateNumber = item.CarPlateNumber,

                    City = item.City,

                    Street = item.Street,

                    Image = item.Image
                };
                lestUsers.Add(user);
            };
            return Ok(lestUsers);
        }

        [HttpPut("UpdateUser/{id}")]
        public IActionResult UbdateUser(int id, EditUserByAdminDTO editUserByAdminDTO)
        {
            if (id == null || id <= 0)
            {
                return BadRequest("You can not use null or 0 or negative value for id");
            }
            if (editUserByAdminDTO.Image != null)
            {
                var uploadFile = @"C:\Users\Orange\Desktop\masterpies\masterpies\car_charging\img";

                if (!Directory.Exists(uploadFile))
                {
                    Directory.CreateDirectory(uploadFile);
                }
                var imgFile = Path.Combine(uploadFile, editUserByAdminDTO.Image.FileName);
                using (var steam = new FileStream(imgFile, FileMode.Create))
                {
                    editUserByAdminDTO.Image.CopyTo(steam);
                }

            }

            var user = _db.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            user.UserName = editUserByAdminDTO.UserName ?? user.UserName;
            user.Email = editUserByAdminDTO.Email ?? user.Email;
            user.PhonrNumber = editUserByAdminDTO.PhonrNumber ?? user.PhonrNumber;
            user.CarPlateNumber = editUserByAdminDTO.CarPlateNumber ?? user.CarPlateNumber;
            user.City = editUserByAdminDTO.City ?? user.City;
            user.Street = editUserByAdminDTO.Street ?? user.Street;
            user.Image = editUserByAdminDTO.Image?.FileName ?? user.Image;
            _db.Users.Update(user);
            _db.SaveChanges();

            return Ok();
        }

        [HttpDelete("DeletUser/{id}")]
        public IActionResult DeletUser(int id)
        {
            if (id <= 0 || id == null)
            {
                return BadRequest("You can not use null or 0 or negative value for id");
            }
            var user = _db.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            _db.Users.Remove(user);
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet("GetAllTestimonials")]
        public IActionResult GetAllTestimonials()
        {
            var testimonials = _db.Testimonials.OrderBy(m => m.IsAccepted).ToList();
            var lestTestimonials = new List<GetAllTestimonialsDTO>();

            foreach (var item in testimonials)
            {
                var testimonial = new GetAllTestimonialsDTO
                {
                    Id = item.Id,
                    UserName = item.UserName,
                    Email = item.Email,
                    TheTestimonial = item.TheTestimonial,
                    IsAccepted = item.IsAccepted
                };
                lestTestimonials.Add(testimonial);
            }
            return Ok(lestTestimonials);
        }

        [HttpDelete("DeleteTestimonial/{id}")]
        public IActionResult DeleteTestimonial(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }

            var testmonial = _db.Testimonials.FirstOrDefault(u => u.Id == id);
            if (testmonial == null)
            {
                return NotFound();
            }
            _db.Testimonials.Remove(testmonial);
            _db.SaveChanges();
            return Ok();
        }
        [HttpPut("AcceptTestimonial/{id}")]
        public IActionResult AcceptTestimonial(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var testimonial = _db.Testimonials.FirstOrDefault(u => u.Id == id);
            if (testimonial == null)
            {
                return NotFound();
            }
            testimonial.IsAccepted = true;
            _db.Testimonials.Update(testimonial);
            _db.SaveChanges();
            return Ok();
        }
        [HttpGet("GetAllContactus")]
        public IActionResult GetAllContactus()
        {
            var contactUs = _db.Contactus.ToList();
            return Ok(contactUs);
        }
        [HttpDelete("DeletContactMessage/{id}")]
        public IActionResult DeletContactMessage(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }

            var contactMessage = _db.Contactus.FirstOrDefault(u => u.Id == id);
            if (contactMessage == null)
            {
                return NotFound();
            }
            _db.Contactus.Remove(contactMessage);
            _db.SaveChanges();
            return Ok();
        }

        ///////// API filters section ////////////

        [HttpGet("GetEmployeeByIdNumber/{idNumber}")]
        public IActionResult GetEmployeeById(int idNumber)
        {
            if (idNumber <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var employee = _db.Employees.Where(w => w.EmployeeId == idNumber).ToList();
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }
        [HttpGet("GetUserByCarPlateNumber/{carnumber}")]
        public IActionResult GetUserByCarPlateNumber(int carnumber)
        {
            if (carnumber <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var user = _db.Users.Where(c => c.CarPlateNumber == carnumber).ToList().FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }
            var userDTO = new List<GetAllUsersDTO>();
            var userlist = new GetAllUsersDTO
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PhonrNumber = user.PhonrNumber,
                CarPlateNumber = user.CarPlateNumber,
                City = user.City,
                Street = user.Street,
                Image = user.Image
            };
            userDTO.Add(userlist);
            return Ok(userDTO);
        }
        [HttpGet("GetVehicleRequestByCarPlateNumber/{CarPlateNumber}")]
        public IActionResult GetVehicleRequestByCarPlateNumber(int CarPlateNumber)
        {
            if (CarPlateNumber <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var vehicleRequest = _db.VehicaleChargings.Where(w => w.IsAccept == false && w.CarPlateNumber == CarPlateNumber)
                .Select(s => new
                {
                    s.Id,
                    s.PhoneNumber,
                    s.CarPlateNumber,
                    s.CarType,
                    s.ChargerType,
                    s.Date,
                    s.Time,
                    s.Status,
                    s.User.UserName
                })
                .ToList();
            if (vehicleRequest == null)
            {
                return NotFound();
            }
            return Ok(vehicleRequest);
        }
        [HttpGet("GetDeliveryChargerRequestsByCarNumber/{carNumber}")]
        public IActionResult GetAllDeliveryChargerRequests(int carNumber)
        {
            var deliveryChargers = _db.DeliveryChargers
                .Where(w => w.IsAccept == false && w.CarPlateNumber == carNumber)
                .Select(s => new
                {
                    s.Id,
                    s.PhoneNumber,
                    s.TheLoction,
                    s.CarPlateNumber,
                    s.CarType,
                    s.ChargerType,
                    s.City,
                    s.User.UserName
                })
                .ToList();
            return Ok(deliveryChargers);
        }
        [HttpGet("GetAllComputerCheckRequestsByCarNumber/{carNumber}")]
        public IActionResult GetAllComputerCheckRequests(int carNumber)
        {
            var computerChecks = _db.ComputerChecks
                .Where(w => w.IsAccept == false && w.CarPlateNmber == carNumber)
                .Select(s => new
                {
                    s.Id,
                    s.PhoneNumber,
                    s.TheLocation,
                    s.CarPlateNmber,
                    s.CarType,
                    s.CarClass,
                    s.ManufacturingDate,
                    s.User.UserName
                })
                .ToList();
            return Ok(computerChecks);
        }
        
    }
}
