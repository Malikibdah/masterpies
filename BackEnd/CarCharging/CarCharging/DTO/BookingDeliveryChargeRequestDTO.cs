using System.ComponentModel.DataAnnotations;

namespace CarCharging.DTO
{
    public class BookingDeliveryChargeRequestDTO
    {
        [Required(ErrorMessage ="The Locatoin is Requerd")]
        public string TheLoction { get; set; } = null!;

        [Required(ErrorMessage = "The PhoneNumber is Requerd")]
        public int PhoneNumber { get; set; }

        [Required(ErrorMessage = "The CarPlateNumber is Requerd")]
        [Range(1, 9999999, ErrorMessage = "Car plate number must be exactly 7 digits.")]
        public int CarPlateNumber { get; set; }

        [Required(ErrorMessage = "The CarType is Requerd")]
        public string CarType { get; set; } = null!;

        [Required(ErrorMessage = "The ChargerType is Requerd")]
        public string ChargerType { get; set; } = null!;

        [Required(ErrorMessage = "The City is Requerd")]
        public string? City { get; set; }
    }
}
