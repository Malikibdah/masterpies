using System;
using System.Collections.Generic;

namespace CarCharging.Models;

public partial class Project
{
    public int Id { get; set; }

    public string ProjectName { get; set; } = null!;

    public string Image { get; set; } = null!;
}
