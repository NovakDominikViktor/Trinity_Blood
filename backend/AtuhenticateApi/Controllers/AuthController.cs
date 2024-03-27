using backend.Models.Dtos;
using backend.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuth authService;

        public AuthController(IAuth authService)
        {
            this.authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto model)
        {
            var errorMessage = await authService.Register(model);

            if (!string.IsNullOrEmpty(errorMessage))
            {
                return StatusCode(400, errorMessage);
            }

            return StatusCode(201, "Registration Successful.");
        }

        [HttpPost("AssignRole")]
        public async Task<ActionResult> AssignRole([FromBody] RoleDto model)
        {
            var assignRoleSuccessful = await authService.AssignRole(model.Email, model.Role.ToUpper());

            if (!assignRoleSuccessful)
            {
                return BadRequest();
            }

            return StatusCode(200, "Role successfully assigned.");
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequestDto model)
        {
            var loginResponse = await authService.Login(model);

            if (loginResponse.User == null)
            {
                return BadRequest("Invalid email or password!");
            }

            return StatusCode(200, loginResponse);
        }

        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto model)
        {
            // Validate the reset password request
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid reset password request.");
            }

            // Reset the password using the provided token and new password
            var result = await authService.ResetPassword(model.Email, model.Token, model.NewPassword);

            if (result.Success)
            {
                // Password reset successful
                return Ok("Password reset successfully.");
            }
            else
            {
                // Password reset failed
                return BadRequest(result.ErrorMessage);
            }
        }


    }
}
