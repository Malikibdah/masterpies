namespace CarCharging.DTO
{
    public class UpdateServiceDTO
    {
        public string? ServiceName { get; set; }

        public string? Description { get; set; }

        public IFormFile? Image { get; set; }
    }
}
