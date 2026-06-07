import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  Books:any = [];
 
  constructor(private crudService: CrudService) { }
 
  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res)
      this.Books =res;
    })
  }

  onDelete(id: any): void {
    this.crudService.DeleteBook(id)
    .subscribe({
      next: () => {
        // Update the list locally after successful delete.
        this.Books = this.Books.filter((book: any) => book._id !== id);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}