using ApplicationService.implementations;
using ApplicationService.Models.UserModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CryptoHelpers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserManagementService _userManagementService;

        public UserController(IUserManagementService userManagementService)
        {
            _userManagementService = userManagementService;
        }
        [HttpPost("registration")]
        public async Task<IActionResult> Registration([FromBody] RegistrationModel registrationModel)
        {
            bool registrationResult = await _userManagementService.Registration(registrationModel);
            if (registrationResult)
            {
                return Ok(new { message = "User was registered" });
            }
            return BadRequest(new { message = "User with this email already registered" });
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthenticateModel authenticateModel)
        {
            string jwtToken = await _userManagementService.Authorization(authenticateModel);
            if (jwtToken == string.Empty)
                return BadRequest(new { message = "password or email is incorrect" });

            return Ok(jwtToken);
        }
    }
}
