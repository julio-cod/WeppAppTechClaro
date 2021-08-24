using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebAPITechClaro.Models.Entity;

namespace WebAPITechClaro.Servicios
{
    public class BooksServices
    {
        public IEnumerable<BookEntity> ListBooks()
        {
            IEnumerable<BookEntity> book = null;
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://fakerestapi.azurewebsites.net/api/v1/Books");
                    var responseTask = client.GetAsync("books");
                    responseTask.Wait();

                    var result = responseTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        var readJob = result.Content.ReadAsAsync<IList<BookEntity>>();
                        readJob.Wait();
                        book = readJob.Result;
                    }
                    else
                    {
                        book = Enumerable.Empty<BookEntity>();

                    }
                    return book;
                }
            }
            catch (Exception)
            {
                return Enumerable.Empty<BookEntity>();
            }
            

        }

        public object FindBooks(int id)
        {
            try
            {
                if (id.ToString() == "" || id.ToString() == null)
                {
                    return System.Net.HttpStatusCode.NotFound;
                }

                using (var client = new HttpClient())
                {
                    BookEntity book = null;
                    client.BaseAddress = new Uri("https://fakerestapi.azurewebsites.net/api/v1/");
                    var responseTask = client.GetAsync("Books/" + id.ToString());
                    responseTask.Wait();

                    var result = responseTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        result.StatusCode = System.Net.HttpStatusCode.OK;
                        var readTask = result.Content.ReadAsAsync<BookEntity>();
                        readTask.Wait();

                        book = readTask.Result;

                        if (result.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            return book;
                        }
                        else
                        {
                            return result.StatusCode;
                        }
                    }
                    else
                    {
                        return System.Net.HttpStatusCode.NotFound;
                    }
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
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://fakerestapi.azurewebsites.net/api/v1/");
                    var postJob = client.PostAsJsonAsync<BookEntity>("Books", book);
                    postJob.Wait();

                    var postResult = postJob.Result;
                    if (postResult.IsSuccessStatusCode)
                    {
                        return postResult.StatusCode;
                    }
                    else
                    {
                        return System.Net.HttpStatusCode.NotFound;
                    }

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
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://fakerestapi.azurewebsites.net/api/v1/Books/");
                    var putTaks = client.PutAsJsonAsync<BookEntity>(id.ToString(), book);
                    putTaks.Wait();

                    var result = putTaks.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        return result.StatusCode;
                    }
                    else
                    {
                        return System.Net.HttpStatusCode.NotFound;
                    }


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
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://fakerestapi.azurewebsites.net/api/v1/");
                    var deleteTask = client.DeleteAsync("Books/" + id.ToString());


                    var result = deleteTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        return result.StatusCode;
                    }
                    else
                    {
                        return System.Net.HttpStatusCode.NotFound;
                    }
                }
            }
            catch (Exception)
            {

                return System.Net.HttpStatusCode.NotFound;
            }



        }


    }
}
