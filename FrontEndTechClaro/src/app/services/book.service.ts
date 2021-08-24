import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  public listBooks(url:string){
    return this.http.get(url);
  }

  public findBook(url:string){
    return this.http.get(url);
  }

  public createBook(url:string, body: 
    { 
      id: any,
      title: any,
      description: any,
      pageCount: any,
      excerpt: any,
      publishDate: any}){
       return this.http.post(url,body);
     }
    
     public editBook(url:string, body: 
      { 
        id: any,
        title: any,
        description: any,
        pageCount: any,
        excerpt: any,
        publishDate: any}){
           return this.http.put(url,body);
         }
    
      public deleteBook(url:string )
      {
        return this.http.delete(url);
      }

}
