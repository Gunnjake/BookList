using Microsoft.AspNetCore.Mvc;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        private BookDbContext _watercontext;
        public BookController(BookDbContext temp)
        {
            _watercontext = temp;
        }
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int BookQty = 5, int PageNum = 1)
        {
            var something = _watercontext.Books
                .Skip((PageNum - 1) * BookQty)
                .Take(BookQty)
                .ToList();
            var TotalNumBooks = _watercontext.Books.Count();
            var someObject = new
            {
                Books = something,
                TotalNumBooks = TotalNumBooks
            };
            return Ok(someObject);
        }
    }
}
