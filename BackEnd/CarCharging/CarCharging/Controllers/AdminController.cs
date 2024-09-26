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
            if (admin == null) {
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
            admin.Password = updateAdminDTO.Password ?? admin.Password;
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
        
    }
}
