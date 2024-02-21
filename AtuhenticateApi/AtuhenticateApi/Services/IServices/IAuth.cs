using AtuhenticateApi.Models.Dtos;

namespace AtuhenticateApi.Services.IServices
{
    public interface IAuth
    {
        Task<string> Register(RegisterRequestDto registerRequestDto);
        Task<bool> AssignRole(string email, string roleName);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);

    }
}
