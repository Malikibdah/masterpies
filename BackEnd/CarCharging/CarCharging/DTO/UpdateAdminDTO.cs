namespace CarCharging.DTO
{
    public class UpdateAdminDTO
    {
        public string? AdminName { get; set; } = null!;

        public int? PhoneNumber { get; set; }

        public string? Email { get; set; } = null!;

        public string? Address { get; set; }


        public IFormFile? Image { get; set; }
    }
}
