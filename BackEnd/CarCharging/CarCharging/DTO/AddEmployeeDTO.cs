using System.ComponentModel.DataAnnotations;

namespace CarCharging.DTO
{
    public class AddEmployeeDTO
    {
        [Required]
        public string EmpName { get; set; } = null!;
        [Required]
        public int EmployeeId { get; set; }
        [Required]
        public decimal? Salary { get; set; }
        [Required]
        public string Jobtitle { get; set; } = null!;
        [Required]
        public int? PhoneNumber { get; set; }
        [Required]
        public int? EmergencyNumber { get; set; }
        [Required]
        public IFormFile? Image { get; set; }
    }
}
