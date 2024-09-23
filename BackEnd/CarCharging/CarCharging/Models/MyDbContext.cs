using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CarCharging.Models;

public partial class MyDbContext : DbContext
{
    public MyDbContext()
    {
    }

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<ComputerCheck> ComputerChecks { get; set; }

    public virtual DbSet<Contactu> Contactus { get; set; }

    public virtual DbSet<DeliveryCharger> DeliveryChargers { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<Testimonial> Testimonials { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<VehicaleCharging> VehicaleChargings { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-G7O24FF;Database=Carchargingstation;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("admin_id_primary");

            entity.ToTable("Admin");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.AdminName).HasMaxLength(255);
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Password).HasMaxLength(255);
        });

        modelBuilder.Entity<ComputerCheck>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("computercheck_id_primary");

            entity.ToTable("ComputerCheck");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CarClass).HasMaxLength(255);
            entity.Property(e => e.CarType).HasMaxLength(255);
            entity.Property(e => e.IsAccept)
                .HasDefaultValue(false)
                .HasColumnName("isAccept");
            entity.Property(e => e.ManufacturingDate).HasMaxLength(255);
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasDefaultValue("pending");
            entity.Property(e => e.TheLocation).HasMaxLength(255);

            entity.HasOne(d => d.User).WithMany(p => p.ComputerChecks)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("computercheck_userid_foreign");
        });

        modelBuilder.Entity<Contactu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("contactus_id_primary");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Message).HasMaxLength(255);
            entity.Property(e => e.Subject).HasMaxLength(255);
        });

        modelBuilder.Entity<DeliveryCharger>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("deliverycharger_id_primary");

            entity.ToTable("DeliveryCharger");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CarType).HasMaxLength(255);
            entity.Property(e => e.ChargerType).HasMaxLength(255);
            entity.Property(e => e.City).HasMaxLength(255);
            entity.Property(e => e.IsAccept)
                .HasDefaultValue(false)
                .HasColumnName("isAccept");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasDefaultValue("pending");
            entity.Property(e => e.TheLoction).HasMaxLength(255);

            entity.HasOne(d => d.User).WithMany(p => p.DeliveryChargers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("deliverycharger_userid_foreign");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("employees_id_primary");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EmpName).HasMaxLength(255);
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Jobtitle).HasMaxLength(255);
            entity.Property(e => e.Salary).HasColumnType("decimal(8, 2)");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("projects_id_primary");

            entity.Property(e => e.ProjectName).HasMaxLength(255);
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("services_id_primary");

            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.IsHidden).HasColumnName("isHidden");
            entity.Property(e => e.ServiceName).HasMaxLength(255);
        });

        modelBuilder.Entity<Testimonial>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("testimonial_id_primary");

            entity.ToTable("Testimonial");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.TheTestimonial).HasMaxLength(255);
            entity.Property(e => e.UserName).HasMaxLength(255);

            entity.HasOne(d => d.User).WithMany(p => p.Testimonials)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("testimonial_userid_foreign");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_id_primary");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.City).HasMaxLength(255);
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Street).HasMaxLength(255);
            entity.Property(e => e.UserName).HasMaxLength(255);
        });

        modelBuilder.Entity<VehicaleCharging>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("vehicalecharging_id_primary");

            entity.ToTable("VehicaleCharging");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CarType).HasMaxLength(255);
            entity.Property(e => e.ChargerType).HasMaxLength(255);
            entity.Property(e => e.Date).HasMaxLength(255);
            entity.Property(e => e.IsAccept)
                .HasDefaultValue(false)
                .HasColumnName("isAccept");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasDefaultValue("pending");
            entity.Property(e => e.Time).HasMaxLength(255);

            entity.HasOne(d => d.User).WithMany(p => p.VehicaleChargings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("vehicalecharging_userid_foreign");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
