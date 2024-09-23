using System;
using System.Collections.Generic;

namespace CarCharging.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string EmpName { get; set; } = null!;

    public int EmployeeId { get; set; }

    public decimal? Salary { get; set; }

    public string Jobtitle { get; set; } = null!;

    public int? PhoneNumber { get; set; }

    public int? EmergencyNumber { get; set; }

    public string? Image { get; set; }
}
