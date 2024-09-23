using System;
using System.Collections.Generic;

namespace CarCharging.Models;

public partial class User
{
    public int Id { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public int? PhonrNumber { get; set; }

    public int? CarPlateNumber { get; set; }

    public string? City { get; set; }

    public string? Street { get; set; }

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<ComputerCheck> ComputerChecks { get; set; } = new List<ComputerCheck>();

    public virtual ICollection<DeliveryCharger> DeliveryChargers { get; set; } = new List<DeliveryCharger>();

    public virtual ICollection<Testimonial> Testimonials { get; set; } = new List<Testimonial>();

    public virtual ICollection<VehicaleCharging> VehicaleChargings { get; set; } = new List<VehicaleCharging>();
}
