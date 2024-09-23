using System.ComponentModel.DataAnnotations;

namespace CarCharging.DTO
{
    public class UpdateProjectDTO
    {
        
        public string? ProjectName { get; set; }
        
        public IFormFile? Image { get; set; }
    }
}
