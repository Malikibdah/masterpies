using System;
using System.Collections.Generic;

namespace CarCharging.Models;

public partial class Contactu
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string? Subject { get; set; }

    public string? Message { get; set; }
}
