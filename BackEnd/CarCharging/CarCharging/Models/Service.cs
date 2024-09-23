using System;
using System.Collections.Generic;

namespace CarCharging.Models;

public partial class Service
{
    public int Id { get; set; }

    public string ServiceName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Image { get; set; } = null!;

    public bool? IsHidden { get; set; }
}
