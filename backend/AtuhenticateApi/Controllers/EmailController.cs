using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mail;
using System.Threading.Tasks;
using backend.Services.IServices;
using backend.Models;
using System.Web;
using backend.Models.Dtos;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IAuth authService; // Inject IAuth service

        public EmailController(IAuth authService)
        {
            this.authService = authService;
        }

        [HttpPost("sendemail")]
        public async Task<IActionResult> SendEmail([FromBody] Email emailData)
        {
            try
            {
                // Compose email content
                string subject = emailData.Subject;
                string body = emailData.Content;

                // Send email
                await SendEmail(emailData.RecipientEmail, subject, body);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("passwordreset")]
        public async Task<IActionResult> SendPasswordResetEmail([FromBody] Email emailData)
        {
            try
            {
              
                var tokenResult = await authService.GeneratePasswordResetToken(emailData.RecipientEmail);

                if (tokenResult == null)
                {
                    return BadRequest("Password reset request failed. User not found or other error occurred.");
                }

         
                var email = tokenResult.Email;
                var token = tokenResult.Token;

               
                var encodedEmail = Convert.ToBase64String(Encoding.UTF8.GetBytes(email));
                var resetLink = $"http://localhost:3000/resetpassword?token={token}&email={HttpUtility.UrlEncode(encodedEmail)}";

            
                string subject = "Password Reset";
                string body = $@"
            <p>Hi there!</p>
            <p>We noticed you're having trouble accessing your account and need to reset your password. No worries, we're here to help!</p>
            <p>Just click the button below to reset your password:</p>
            <table cellspacing='0' cellpadding='0'>
                <tr>
                    <td align='center' bgcolor='#007bff' style='border-radius: 4px;'>
                        <a href='{resetLink}' target='_blank' style='font-family: Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 4px; display: inline-block;'>
                            Reset Your Password
                        </a>
                    </td>
                </tr>
            </table>
            <p>If you didn't request this password reset, you can ignore this email. Your account's security is important to us.</p>
            <p>Thanks,</p>";

                // Send email
                await SendEmail(email, subject, body);

                // Return email and token along with the "OK" response
                return Ok(tokenResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




        private async Task SendEmail(string recipientEmail, string subject, string body)
        {
         
            MailMessage mail = new MailMessage();

           
            SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");

            
            mail.From = new MailAddress("nagysohajok@gmail.com");

            
            mail.To.Add(recipientEmail);

           
            mail.Subject = subject;

           
            mail.Body = body;

           
            mail.IsBodyHtml = true;

           
            smtpServer.Credentials = new System.Net.NetworkCredential("nagysohajok@gmail.com", "gxyqbiwlkighzipx ");

           
            smtpServer.Port = 587;

          
            smtpServer.EnableSsl = true;

        
            await smtpServer.SendMailAsync(mail);
        }
    }
}
