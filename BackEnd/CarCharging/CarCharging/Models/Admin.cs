using System;
using System.Collections.Generic;

namespace CarCharging.Models;

public partial class Admin
{
    public int Id { get; set; }

    public string AdminName { get; set; } = null!;

    public int? PhoneNumber { get; set; }

    public string Email { get; set; } = null!;

    public string? Address { get; set; }

    public string Password { get; set; } = null!;

    public string? Image { get; set; }
}
