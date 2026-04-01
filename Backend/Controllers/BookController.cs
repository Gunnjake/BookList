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

        [HttpGet("{id}")]
        // Return single book
        public IActionResult GetBook(int id)
        {
            // Find matching book
            var book = _bookcontext.Books.FirstOrDefault(b => b.BookId == id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        [HttpPost]
        // Create new book
        public IActionResult AddBook([FromBody] Book book)
        {
            // Save new book
            _bookcontext.Books.Add(book);
            _bookcontext.SaveChanges();

            return CreatedAtAction(nameof(GetBook), new { id = book.BookId }, book);
        }

        [HttpPut("{id}")]
        // Update existing book
        public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
        {
            // Find book to update
            var existingBook = _bookcontext.Books.FirstOrDefault(b => b.BookId == id);

            if (existingBook == null)
            {
                return NotFound();
            }

            // Copy updated values
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookcontext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("{id}")]
        // Delete existing book
        public IActionResult DeleteBook(int id)
        {
            // Find book to delete
            var book = _bookcontext.Books.FirstOrDefault(b => b.BookId == id);

            if (book == null)
            {
                return NotFound();
            }

            // Remove selected book
            _bookcontext.Books.Remove(book);
            _bookcontext.SaveChanges();

            return NoContent();
        }
    }
}
