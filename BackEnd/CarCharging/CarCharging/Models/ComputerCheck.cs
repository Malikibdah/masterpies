using System;
using System.Collections.Generic;

namespace CarCharging.Models;

public partial class ComputerCheck
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string TheLocation { get; set; } = null!;

    public int PhoneNumber { get; set; }

    public int CarPlateNmber { get; set; }

    public string CarType { get; set; } = null!;

    public string CarClass { get; set; } = null!;

    public string ManufacturingDate { get; set; } = null!;

    public string? Status { get; set; }

    public bool? IsAccept { get; set; }

    public virtual User User { get; set; } = null!;
}
