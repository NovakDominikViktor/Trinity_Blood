namespace backend.Models.Dtos
{
    public class PasswordResetTokenResultDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
