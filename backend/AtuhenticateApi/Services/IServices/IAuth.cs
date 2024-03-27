using System.Threading.Tasks;
using backend.Models.Dtos;

namespace backend.Services.IServices
{
    public interface IAuth
    {
        Task<string> Register(RegisterRequestDto registerRequestDto);
        Task<bool> AssignRole(string email, string roleName);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<ChangePasswordResultDto> ResetPassword(string email, string token, string newPassword);

        Task<PasswordResetTokenResultDto> GeneratePasswordResetToken(string email);
    }
}
