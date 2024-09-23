using System.ComponentModel.DataAnnotations;

namespace CarCharging.DTO
{
    public class AdminloginDTO
    {
        [Required (ErrorMessage ="The Email is required")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "The Password is required")]
        public string Password { get; set; } = null!;
    }
}
