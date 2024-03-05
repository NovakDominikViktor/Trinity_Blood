using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mail;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> SendEmail([FromBody] Email emailData)
        {
            try
            {
                // Itt hívja meg az e-mail küldéséért felelős metódust
                SendMail(emailData.RecipientEmail, emailData.Subject, emailData.Content);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        public static void SendMail(string mailAddressTo, string subject, string body)
        {
            MailMessage mail = new MailMessage();
            SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("nagysohajok@gmail.com");
            mail.To.Add(mailAddressTo);
            mail.Subject = subject;
            mail.Body = body;
            //smtpServer.Credentials = new System.Net.NetworkCredential("tesztlevelkuldo@kkszki.hu", "Balazska-1234");
            smtpServer.Credentials = new System.Net.NetworkCredential("nagysohajok@gmail.com", "gxyqbiwlkighzipx ");

            smtpServer.Port = 587;
            smtpServer.EnableSsl = true;
            smtpServer.Send(mail);
        }
    }
}
