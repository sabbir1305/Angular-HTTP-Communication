import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { allBooks, allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders():Observable<Reader[]> {
    return this.http.get<Reader[]>(`/api/readers`);
  }

  getReaderById(id: number):Observable<Reader> {
    let getHeaders:HttpHeaders = new HttpHeaders({
      'Accept':'application/json',
      'Authorization':'my-token'
    });
    return this.http.get<Reader>(`api/readers/${id}`,{
      headers:getHeaders
    });
  }

  addReader(newReader:Reader):Observable<Reader>{
    return this.http.post<Reader>(`/api/readers`,newReader,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
  }

  updateReader(updateReader:Reader):Observable<void>{
    return this.http.put<void>(`/api/readers/${updateReader.readerID}`,updateReader,{
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
  });
}

deleteReader(readerID:number):Observable<void>{
  return this.http.delete<void>(`/api/readers/${readerID}`);
}

  getAllBooks():Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number):Observable<Book> {
    let getHeaders:HttpHeaders = new HttpHeaders({
      'Accept':'application/json',
      'Authorization':'my-token'
    });

    return this.http.get<Book>(`/api/books/${id}`,{
      headers:getHeaders
    });
  }

  addBook(newBook:Book):Observable<Book>{

    return this.http.post<Book>(`/api/books`,newBook,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
  }

  updateBook(upBook:Book):Observable<void>{
    return this.http.put<void>(`/api/books/${upBook.bookID}`,upBook,{
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })

    });
  }

  deleteBook(bookID:number):Observable<void>{
    return this.http.delete<void>(`/api/books/${bookID}`);
  }

}
