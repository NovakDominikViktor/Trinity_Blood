using backend.Models.Dtos;
using backend.Services.IServices;
using Microsoft.AspNetCore.Mvc;

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

            return StatusCode(201, "Sikeres Regisztráció.");
        }

        [HttpPost("AssignRole")]
        public async Task<ActionResult> AssignRole([FromBody] RoleDto model)
        {

            var assignRoleSuccesful = await authService.AssignRole(model.Email, model.Role.ToUpper());

            if (!assignRoleSuccesful)
            {
                return BadRequest();
            }


            return StatusCode(200, "Sikeres szerep létrehozás.");
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequestDto model)
        {
            var loginResponse = await authService.Login(model);

            if (loginResponse.User == null)
            {
                return BadRequest("Nem megfelelő email vagy jelszó!");
            }

            return StatusCode(200, loginResponse);

        }
    }
}
