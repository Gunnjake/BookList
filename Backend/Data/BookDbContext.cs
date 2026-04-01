using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    // Database context class
    public class BookDbContext : DbContext
    {
        // Inject db options
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }
        // Books table set
        public DbSet<Book> Books { get; set; }
    } 
}
