using System.ComponentModel.DataAnnotations;

namespace CarCharging.DTO
{
    public class CheckForAvailableCharger
    {
        [Required(ErrorMessage = "The Date is Requerd")]
        public string Date { get; set; } = null!;

        [Required(ErrorMessage = "The Time is Requerd")]
        public string Time { get; set; } = null!;
    }
}
