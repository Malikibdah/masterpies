namespace CarCharging.DTO
{
    public class UpdateAdminDTO
    {
        public string? AdminName { get; set; } = null!;

        public int? PhoneNumber { get; set; }

        public string? Email { get; set; } = null!;

        public string? Address { get; set; }

        public string? Password { get; set; } = null!;

        public IFormFile? Image { get; set; }
    }
}
