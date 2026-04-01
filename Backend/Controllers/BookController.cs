using Microsoft.AspNetCore.Mvc;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    // Handle book endpoints
    public class BookController : Controller
    {
        private BookDbContext _bookcontext;
        // Inject database context
        public BookController(BookDbContext temp)
        {
            _bookcontext = temp;
        }
        [HttpGet("AllBooks")]
        // Return filtered books
        public IActionResult GetBooks(int BookQty = 8, int PageNum = 1, [FromQuery] List<string>? Categorytypes = null)
        {
            // Start books query
            var query = _bookcontext.Books.AsQueryable();

            if (Categorytypes != null && Categorytypes.Any())
            {
                // Apply category filter
                query = query.Where(b => Categorytypes.Contains(b.Category));
            }

            // Count matching books
            var TotalNumBooks = query.Count();

            // Apply book paging
            var something = query
                .Skip((PageNum - 1) * BookQty)
                .Take(BookQty)
                .ToList();

            // Build response object
            var someObject = new
            {
                Books = something,
                TotalNumBooks = TotalNumBooks
            };
            return Ok(someObject);
        }
        [HttpGet("BookCategories")]
        // Return book categories
        public IActionResult GetBookCategories()
        {
            // Select unique categories
            var something = _bookcontext.Books
                .Select(x => x.Category)
                .Distinct()
                .ToList();
            return Ok(something);
        }
    }
}
