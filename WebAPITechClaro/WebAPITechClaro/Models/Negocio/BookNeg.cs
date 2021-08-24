using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPITechClaro.Models.Entity;
using WebAPITechClaro.Servicios;

namespace WebAPITechClaro.Models.Negocio
{
    public class BookNeg
    {
        BooksServices objBooksServices;

        public BookNeg()
        {
            objBooksServices = new BooksServices();

        }
        public IEnumerable<BookEntity> ListBooks()
        {
            return objBooksServices.ListBooks();
        }

        public object FindBooks(int id)
        {
            try
            {
                if (id.ToString() == "" || id.ToString() == null)
                {
                    return System.Net.HttpStatusCode.NotFound;
                }
                else
                {
                    return objBooksServices.FindBooks(id);
                }
                
            }
            catch (Exception)
            {
                return System.Net.HttpStatusCode.NotFound;
            }



        }

        public object CreateBook(BookEntity book)
        {
            try
            {
                if (book.Id.ToString() == "" || book.Title == "" || book.Description == "" || book.PageCount.ToString() == "" || book.Excerpt == "" || book.PublishDate == "")
                {
                    return System.Net.HttpStatusCode.NoContent;
                }
                else
                {
                    return objBooksServices.CreateBook(book);
                }
            }
            catch (Exception)
            {

                return System.Net.HttpStatusCode.NotFound;
            }



        }

        public object EditBook(BookEntity book, int id)
        {
            try
            {
                if (book.Id.ToString() == "" || book.Title == "" || book.Description == "" || book.PageCount.ToString() == "" || book.Excerpt == "" || book.PublishDate == "")
                {
                    return System.Net.HttpStatusCode.NoContent;
                }
                else
                {
                    return objBooksServices.EditBook(book,id);
                }
            }
            catch (Exception)
            {

                return System.Net.HttpStatusCode.NotFound;
            }


        }

        public object DeleteBook(int id)
        {

            try
            {
                if(id.ToString() == "" || id.ToString() == null)
                {
                    return System.Net.HttpStatusCode.NotFound;
                }
                else
                {
                    return objBooksServices.DeleteBook(id);
                }
            }
            catch (Exception)
            {

                return System.Net.HttpStatusCode.NotFound;
            }



        }

    }
}
