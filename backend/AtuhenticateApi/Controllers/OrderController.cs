using backend.Datas;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            var orders = await _context.Orders.ToListAsync();

            foreach (var order in orders)
            {
                // User részleteinek lekérése
                var user = await _context.Users.FindAsync(order.UserId);
                if (user != null)
                {
                    order.User = new ApplicationUser
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email
                    };
                }

                // Product részleteinek lekérése
                var product = await _context.Products.FindAsync(order.ProductId);
                if (product != null)
                {
                    order.Product = new Products
                    {
                        Name = product.Name
                    };
                }
            }

            return orders;
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            // User részleteinek lekérése
            var user = await _context.Users.FindAsync(order.UserId);
            if (user != null)
            {
                order.User = new ApplicationUser
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email
                };
            }

            // Product részleteinek lekérése
            var product = await _context.Products.FindAsync(order.ProductId);
            if (product != null)
            {
                order.Product = new Products
                {
                    Name = product.Name
                };
            }

            return order;
        }

        // POST: api/Order
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            var existingUser = await _context.Users.FindAsync(order.UserId);
            var existingProduct = await _context.Products.FindAsync(order.ProductId);

            if (existingUser == null || existingProduct == null)
            {
                return BadRequest("The user or product does not exist.");
            }

            order.User = existingUser;
            order.Product = existingProduct;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        // PUT: api/Order/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
