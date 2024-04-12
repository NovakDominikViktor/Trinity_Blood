using backend.Datas;
using backend.Models;
using backend.Models.Dtos;
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
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.Include(p => p.Category).ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
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
       
        public async Task<ActionResult<Product>> CreateProduct(Product product)
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
        public IActionResult Put(int id, ProductUpdateDto productUpdate)
        {
            try
            {
                using (var context = new AuthContext())
                {
                    var productSearch = context.Products.Find(id);

                    if (productSearch == null)
                    {
                        return NotFound(); // Return 404 if the product with the given id is not found
                    }

                    // Update only the allowed properties
                    productSearch.StorageStock = productUpdate.StorageStock;
                    productSearch.IsItInStock = productUpdate.IsItInStock;

                    
                    context.SaveChanges();

                    return StatusCode(203, "Product Changed");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(403, ex.Message);
            }
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
