using backend.Models.Dtos;

namespace backend.Services.IServices
{
    public interface IAuth
    {
        Task<string> Register(RegisterRequestDto registerRequestDto);
        Task<bool> AssignRole(string email, string roleName);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<ChangePasswordResultDto> ChangePassword(ChangePasswordDto model);
    }
}
