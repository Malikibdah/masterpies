namespace CarCharging.DTO
{
    public class EditUserProfileInfoDTO
    {
        public string? UserName { get; set; } = null!;

        public int? PhonrNumber { get; set; }

        public int? CarPlateNumber { get; set; }

        public string? City { get; set; }

        public string? Street { get; set; }

        public IFormFile? Image { get; set; }
    }
}
