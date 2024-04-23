using backend.Controllers;
using backend.Datas;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace CategoryTest
{
    public class Tests
    {
        private CategoryController _controller;

        private AppDbContext _context;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

            _context = new AppDbContext(options);
            _context.Database.EnsureDeleted();
            _controller = new CategoryController(_context);
        }


        [Test]
        public async Task GetCategory_ValidId_ReturnsCategory()
        {
            // Arrange
            var validId = 900;
            var expectedCategory = new Category { Id = validId, Name = "Test Category" };

            _context.Categories.Add(expectedCategory);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetCategory(validId);

            // Assert
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(expectedCategory, result.Value);
        }

        [Test]
        public async Task CreateCategory_ValidCategory_ReturnsCategory()
        {
            // Arrange
            var newCategory = new Category { Name = "New Category" };

            // Act
            var actionResult = await _controller.CreateCategory(newCategory);

            // Assert
            Assert.IsNotNull(actionResult.Result);
            var createdAtActionResult = actionResult.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            var createdCategory = createdAtActionResult.Value as Category;
            Assert.IsNotNull(createdCategory);
            Assert.AreEqual(newCategory.Name, createdCategory.Name);
        }



        [Test]
        public async Task UpdateCategory_ValidIdAndCategory_ReturnsNoContent()
        {
            // Arrange
            var validId = 900;
            var existingCategory = new Category { Id = validId, Name = "Existing Category" };
            _context.Categories.Add(existingCategory);
            await _context.SaveChangesAsync();

            var updatedCategory = await _context.Categories.FindAsync(validId);
            updatedCategory.Name = "Updated Category";

            // Act
            var result = await _controller.UpdateCategory(validId, updatedCategory);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }



        [Test]
        public async Task DeleteCategory_ValidId_ReturnsNoContent()
        {
            // Arrange
            var validId = 900;
            var existingCategory = new Category { Id = validId, Name = "Existing Category" };

            _context.Categories.Add(existingCategory);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.DeleteCategory(validId);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

    }
}