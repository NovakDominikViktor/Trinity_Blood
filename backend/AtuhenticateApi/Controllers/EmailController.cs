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
                // Generate a password reset token for the user
                var tokenResult = await authService.GeneratePasswordResetToken(emailData.RecipientEmail);

                // If tokenResult is null, user not found or other error occurred
                if (tokenResult == null)
                {
                    return BadRequest("Password reset request failed. User not found or other error occurred.");
                }

                // Extract email and token from the tokenResult
                var email = tokenResult.Email;
                var token = tokenResult.Token;

                // Create the password reset link with token
                var encodedEmail = Convert.ToBase64String(Encoding.UTF8.GetBytes(email));
                var resetLink = $"http://localhost:3000/resetpassword?token={token}&email={HttpUtility.UrlEncode(encodedEmail)}";


                // Compose email content
                string subject = "Password Reset";
                string body = $"Click the link below to reset your password: <br/><a href='{resetLink}'>{resetLink}</a>";

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
