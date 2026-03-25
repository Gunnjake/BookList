using Microsoft.AspNetCore.Mvc;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        private BookDbContext _bookcontext;
        public BookController(BookDbContext temp)
        {
            _bookcontext = temp;
        }
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int BookQty = 5, int PageNum = 1, [FromQuery] List<string>? Categorytypes = null)
        {
            var query = _bookcontext.Books.AsQueryable();

            if (Categorytypes != null && Categorytypes.Any())
            {
                query = query.Where(b => Categorytypes.Contains(b.Category));
            }

            var TotalNumBooks = query.Count();

            var something = query
                .Skip((PageNum - 1) * BookQty)
                .Take(BookQty)
                .ToList();

            var someObject = new
            {
                Books = something,
                TotalNumBooks = TotalNumBooks
            };
            return Ok(someObject);
        }
        [HttpGet("BookCategories")]
        public IActionResult GetBookCategories()
        {
            var something = _bookcontext.Books
                .Select(x => x.Category)
                .Distinct()
                .ToList();
            return Ok(something);
        }
    }
}
