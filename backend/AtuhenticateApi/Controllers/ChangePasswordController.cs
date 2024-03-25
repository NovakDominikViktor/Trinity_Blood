using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

public class AccountController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;

    public AccountController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost]
    public async Task<IActionResult> ChangePassword(string email, string oldPassword, string newPassword)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            // Handle the case where the user is not found
            return NotFound();
        }

        var changePasswordResult = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);

        if (!changePasswordResult.Succeeded)
        {
            // Handle the case where changing password failed
            foreach (var error in changePasswordResult.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return BadRequest(ModelState);
        }

        // Password changed successfully
        return Ok("Password changed successfully");
    }
}
