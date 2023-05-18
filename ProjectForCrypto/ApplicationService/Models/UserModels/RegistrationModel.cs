using System.ComponentModel.DataAnnotations;

namespace ApplicationService.Models.UserModels
{
    public class RegistrationModel
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
