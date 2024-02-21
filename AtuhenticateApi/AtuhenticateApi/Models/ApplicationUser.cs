using Microsoft.AspNetCore.Identity;

namespace AtuhenticateApi.Models
{
    public class ApplicationUser : IdentityUser
    {


        public string FullName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }

}
