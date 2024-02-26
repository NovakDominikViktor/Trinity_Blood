using backend.Datas;
using backend.Models.Dtos;
using backend.Models;
using backend.Services.IServices;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class AuthService : IAuth
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IJwtTokenGenerator jwtTokenGenerator)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<bool> AssignRole(string email, string roleName)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user != null)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }

            await _userManager.AddToRoleAsync(user, roleName);

            return true;
        }

        return false;
    }

    public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
    {
        var user = await _userManager.FindByEmailAsync(loginRequestDto.Email);

        if (user != null && await _userManager.CheckPasswordAsync(user, loginRequestDto.Password))
        {
            var roles = await _userManager.GetRolesAsync(user);
            var token = _jwtTokenGenerator.GenerateToken(user, roles);

            var userDto = new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };

            return new LoginResponseDto { User = userDto, Token = token };
        }

        return new LoginResponseDto { User = null, Token = "" };
    }

    public async Task<string> Register(RegisterRequestDto registerRequestDto)
    {
        if (string.IsNullOrEmpty(registerRequestDto.FirstName))
        {
            return "First name is required."; 
        }

        var user = new ApplicationUser
        {
            UserName = registerRequestDto.Email,
            FirstName = registerRequestDto.FirstName,
            LastName = registerRequestDto.LastName,
            Email = registerRequestDto.Email,
            FullName = $"{registerRequestDto.FirstName} {registerRequestDto.LastName}"

        };

        var result = await _userManager.CreateAsync(user, registerRequestDto.Password);

        if (result.Succeeded)
        {
            return "";
        }
        else
        {
            return result.Errors.FirstOrDefault()?.Description ?? "Error Encountered!";
        }
    }


}
