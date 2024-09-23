using System;
using System.Collections.Generic;

namespace CarCharging.Models;

public partial class DeliveryCharger
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string TheLoction { get; set; } = null!;

    public int PhoneNumber { get; set; }

    public int CarPlateNumber { get; set; }

    public string CarType { get; set; } = null!;

    public string ChargerType { get; set; } = null!;

    public string? City { get; set; }

    public string? Status { get; set; }

    public bool? IsAccept { get; set; }

    public virtual User User { get; set; } = null!;
}
