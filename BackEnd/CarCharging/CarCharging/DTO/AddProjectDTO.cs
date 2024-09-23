using System.ComponentModel.DataAnnotations;

namespace CarCharging.DTO
{
    public class AddProjectDTO
    {
        [Required]
        public string ProjectName { get; set; }
        [Required]
        public IFormFile Image { get; set; } 
    }
}
