using System.ComponentModel.DataAnnotations;

namespace CarCharging.DTO
{
    public class BookingComputerCheckRequestDTO
    {
        [Required(ErrorMessage = "The Locatoin is Requerd")]
        public string TheLocation { get; set; } = null!;

        [Required(ErrorMessage = "The PhoneNumber is Requerd")]
        public int PhoneNumber { get; set; }

        [Required(ErrorMessage = "The CarPlateNmber is Requerd")]
        [Range(1, 9999999, ErrorMessage = "Car plate number must be exactly 7 digits.")]
        public int CarPlateNmber { get; set; }

        [Required(ErrorMessage = "The CarType is Requerd")]
        public string CarType { get; set; } = null!;

        [Required(ErrorMessage = "The CarClass is Requerd")]
        public string CarClass { get; set; } = null!;

        [Required(ErrorMessage = "The ManufacturingDate is Requerd")]
        public string ManufacturingDate { get; set; } = null!;
    }
}
