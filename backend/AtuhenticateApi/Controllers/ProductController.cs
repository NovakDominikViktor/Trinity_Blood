using backend.Datas;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
        {
            return await _context.Products.Include(p => p.Category).ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProduct(int id)
        {
            var product = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        
        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<Products>> CreateProduct(Products product)
        {
            
            var existingCategory = await _context.Categories.FindAsync(product.CategoryId);

            if (existingCategory != null)
            {
                
                product.Category = existingCategory;
            }
            else
            {
                
                var newCategory = new Category { Id = product.CategoryId, Name = "Új kategória" }; 
                _context.Categories.Add(newCategory);
                await _context.SaveChangesAsync();

          
                product.Category = newCategory;
            }

    

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateProduct(int id, Products product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            _context.Entry(existingProduct).CurrentValues.SetValues(product);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{productId}/comments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentsForProduct(int productId)
        {
            var productComments = await _context.Comments
                .Where(c => c.ProductId == productId)
                .ToListAsync();

            return productComments;
        }
    }
}
