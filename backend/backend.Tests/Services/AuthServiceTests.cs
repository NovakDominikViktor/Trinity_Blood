using backend.Models;
using backend.Services;
using backend.Services.IServices;
using FluentAssertions;
using FluentAssertions.Execution;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using System.Diagnostics.CodeAnalysis;
using Xunit;

namespace backend.Tests.Services
{
    [ExcludeFromCodeCoverage]
    public class AuthServiceTests
    {
        [Fact]
        public async Task AssignRole_ShouldReturnTrue()
        {
            // Arrange

            // Source: https://code-maze.com/aspnetcore-identity-testing-usermanager-rolemanager/
            var userManagerMock = GetMockedUserManager();
            var roleManagerMock = GetMockedRoleManager();

            userManagerMock.Setup(x => x.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(new ApplicationUser());
            userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()));

            roleManagerMock.Setup(x => x.RoleExistsAsync(It.IsAny<string>()));
            roleManagerMock.Setup(x => x.CreateAsync(It.IsAny<IdentityRole>()));

            var authService = new AuthService(userManagerMock.Object, roleManagerMock.Object, new Mock<IJwtTokenGenerator>().Object);

            // Act
            var result = await authService.AssignRole("test_mail@example.com", "admin");

            // Assert
            using (new AssertionScope())
            {
                result.Should().Be(true);

                userManagerMock.VerifyAll();
                roleManagerMock.VerifyAll();
            }
        }

        [Fact]
        public async Task AssignRole_ShouldReturnFalse()
        {
            // Arrange

            // Source: https://code-maze.com/aspnetcore-identity-testing-usermanager-rolemanager/
            var userManagerMock = GetMockedUserManager();

            userManagerMock.Setup(x => x.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync((ApplicationUser)default);

            var authService = new AuthService(userManagerMock.Object, GetMockedRoleManager().Object, new Mock<IJwtTokenGenerator>().Object);

            // Act
            var result = await authService.AssignRole("", "");

            // Assert
            using (new AssertionScope())
            {
                result.Should().Be(false);

                userManagerMock.VerifyAll();
            }
        }

        private Mock<UserManager<ApplicationUser>> GetMockedUserManager()
        {
            return new Mock<UserManager<ApplicationUser>>(
                new Mock<IUserStore<ApplicationUser>>().Object,
                new Mock<IOptions<IdentityOptions>>().Object,
                new Mock<IPasswordHasher<ApplicationUser>>().Object,
                new IUserValidator<ApplicationUser>[0],
                new IPasswordValidator<ApplicationUser>[0],
                new Mock<ILookupNormalizer>().Object,
                new Mock<IdentityErrorDescriber>().Object,
                new Mock<IServiceProvider>().Object,
                new Mock<ILogger<UserManager<ApplicationUser>>>().Object);
        }

        private Mock<RoleManager<IdentityRole>> GetMockedRoleManager()
        {
            return new Mock<RoleManager<IdentityRole>>(new Mock<IRoleStore<IdentityRole>>().Object,
                new IRoleValidator<IdentityRole>[0],
                new Mock<ILookupNormalizer>().Object,
                new Mock<IdentityErrorDescriber>().Object,
                new Mock<ILogger<RoleManager<IdentityRole>>>().Object);
        }
    }
}
