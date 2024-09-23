﻿using System.ComponentModel.DataAnnotations;

namespace CarCharging.DTO
{
    public class UserRegesterDTO
    {
        [Required(ErrorMessage = "The Username is Required")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "The Email is Required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "The Password is Required")]
        public string? Password { get; set; }

    }
}
