using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPITechClaro.Models.Entity;
using WebAPITechClaro.Models.Negocio;

namespace WebAPITechClaro.Controllers
{
    [ApiController]
    [Route("api/")]
    public class BooksController : Controller
    {
        BookNeg objBookNeg;

        public BooksController()
        {
            objBookNeg = new BookNeg();

        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("Books")]
        public IEnumerable<BookEntity> ListBooks()
        {
            
            try
            {
                return objBookNeg.ListBooks();
            }
            catch (Exception)
            {

                return Enumerable.Empty<BookEntity>();
            }
           
        }

        [HttpGet]
        [Route("Books/{id}")]
        public IActionResult FindBooks(int id)
        {
            return Ok(objBookNeg.FindBooks(id));
       

        }

        [HttpPost]
        [Route("Books")]
        public IActionResult CreateBook(BookEntity book)
        {
            return Ok(objBookNeg.CreateBook(book));
 
        }

        [HttpPut]
        [Route("Books/{id}")]
        public IActionResult EditBook(BookEntity book, int id)
        {
            return Ok(objBookNeg.EditBook(book,id));

        }

        [HttpDelete]
        [Route("Books/{id}")]
        public IActionResult DeleteBook(int id)
        {
            return Ok(objBookNeg.DeleteBook(id));

        }


    }
}
