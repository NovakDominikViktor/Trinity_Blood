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
    public class CommentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Comment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }

        // GET: api/Comment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        [HttpPost]
        [Authorize(Roles = "USER")]
        public async Task<ActionResult<CommentDto>> PostComment(CommentDto commentDto)
        {
            try
            {
                var comment = new Comment
                {
                    UserId = commentDto.UserId,
                    ProductId = commentDto.ProductId,
                    Ratings = commentDto.Ratings,
                    Comments = commentDto.Comments,
                    ReviewDate = commentDto.ReviewDate
                };

                _context.Comments.Add(comment);
                await _context.SaveChangesAsync();

                return Ok(commentDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

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
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ByProduct/{productId}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentsByProduct(int productId)
        {
            var comments = await _context.Comments.Where(c => c.ProductId == productId).ToListAsync();
            return comments;
        }
    }
}
