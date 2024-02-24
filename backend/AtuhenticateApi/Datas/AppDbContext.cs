using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Datas
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ApplicationUser> AppUsers { get; set; } = null!;

        public DbSet<Category> Categories { get; set; } = null!;

        public DbSet<Products> Products { get; set; } = null!;

        public DbSet<Comment> Comments { get; set; } = null!;

        public DbSet<Order> Orders { get; set; } = null!;



        protected override void OnModelCreating(ModelBuilder builder)

        
        {
            base.OnModelCreating(builder);
        }
    }
}
