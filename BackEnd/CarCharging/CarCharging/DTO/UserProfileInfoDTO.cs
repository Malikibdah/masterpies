namespace CarCharging.DTO
{
    public class UserProfileInfoDTO
    {
        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int? PhonrNumber { get; set; }

        public int? CarPlateNumber { get; set; }

        public string? City { get; set; }

        public string? Street { get; set; }

        public string? Image { get; set; }
    }
}
