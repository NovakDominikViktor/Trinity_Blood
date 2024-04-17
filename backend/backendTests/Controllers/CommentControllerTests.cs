using Microsoft.VisualStudio.TestTools.UnitTesting;
using backend.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Datas;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Tests
{
    [TestClass()]
    public class CommentControllerTests
    {
        [TestMethod]
        public async Task GetComments_ReturnsComments()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

            using (var context = new AppDbContext(options))
            {
                context.Comments.Add(new Comment { /* Sample comment data */ });
                context.SaveChanges();
                var controller = new CommentController(context);

                // Act
                var result = await controller.GetComments();

                // Assert
                Assert.IsNotNull(result.Value);
                Assert.IsTrue(result.Value.Any());
            }
        }

        [TestMethod]
        public async Task PostComment_ValidComment_ReturnsOk()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AppDbContext>()
                             .UseInMemoryDatabase(databaseName: "TestDatabase")
                             .Options;
            var mockDbContext = new AppDbContext(options);

            var controller = new CommentController(mockDbContext);

            var commentDto = new CommentDto
            {
                UserId = "1",
                ProductId = 123,
                Ratings = 5,
                Comments = "Great product!",
                ReviewDate = DateTime.Now
            };

            // Act
            var result = await controller.PostComment(commentDto);

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async Task PutComment_ReturnsNoContent()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using (var context = new AppDbContext(options))
            {
                var controller = new CommentController(context);

                // Act
                var result = await controller.PutComment(1, new Comment { Id = 1, /* Egyéb módosított adatok */ });

                // Assert
                Assert.IsInstanceOfType<NoContentResult>(result);
            }
        }
    }

}