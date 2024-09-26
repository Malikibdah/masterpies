using System;
using System.Collections.Generic;

namespace CarCharging.Models;

public partial class Testimonial
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? TheTestimonial { get; set; }

    public bool? IsAccepted { get; set; }

    public virtual User User { get; set; } = null!;
}
