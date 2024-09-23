using System.ComponentModel.DataAnnotations;

namespace CarCharging.DTO
{
    public class UpdateEmployeeDTO
    {
        
        public string? EmpName { get; set; }
       
        public int? EmployeeId { get; set; }

        public decimal? Salary { get; set; }

        public string? Jobtitle { get; set; }
        
        public int? PhoneNumber { get; set; }
        
        public int? EmergencyNumber { get; set; }
        
        public IFormFile? Image { get; set; }
    }
}
