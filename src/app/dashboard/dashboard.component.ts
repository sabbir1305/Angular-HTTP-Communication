import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title,
              private route:ActivatedRoute

              ) { }

  ngOnInit() {
    //  this.dataService.getAllBooks().subscribe(
    //    (data:Book[]|BookTrackerError)=>this.allBooks=<Book[]>data,
    //    (err:BookTrackerError)=>console.log(err)
    //  );

    let resolvedBooks : Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];

    if(resolvedBooks instanceof BookTrackerError){
      console.log(`Dashboard component error: ${resolvedBooks.friendlyMessage}`);

    }
    else{
      this.allBooks = resolvedBooks;
    }
   this.dataService.getAllReaders().subscribe(
     (data:Reader[] | BookTrackerError)=>this.allReaders=<Reader[]>data,
     (err:any)=>console.log(err)
   );
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID).subscribe(
      (data:void)=>{
        let idex:number = this.allBooks.findIndex(book=>book.bookID==bookID);
        this.allBooks.splice(idex,1);
      },
      (err:BookTrackerError )=>console.log(err)
    );
  }

  deleteReader(readerID: number): void {
    this.dataService.deleteReader(readerID).subscribe(
      (data:void)=>{
        let index:number = this.allReaders.findIndex(reader=>reader.readerID==readerID);
        this.allReaders.splice(index,1);
      }
    )

  }

}
