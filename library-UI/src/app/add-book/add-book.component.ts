import { Router } from '@angular/router';
import { Bookapi, Authors } from './../models/bookapi';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookService } from '../services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit  {

  SERVER_URL = "http://localhost:8081/book-api/book";
  uploadForm: FormGroup;  
  exampleDatabase: BookService | null;
  authorsArray: Authors[] = [];
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  localStorage.getItem('token'),
      'Content-Type': 'application/json',
    })
  };
  @ViewChild('chipList') chipList: any;

  profileForm = this.formBuilder.group({
    title: ['', Validators.required],
    isbn: ['', Validators.required],
    subject: ['', Validators.required],
    publisher: ['', Validators.required],
    language: ['', Validators.required],
    noOfPages:['', Validators.required],
    status:['AVAILABLE'],
    authors: [Validators.required]
  });
  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router) { }
  ngOnInit(){

    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  get f() { return this.profileForm.controls; }

  remove(authors: Authors): void {
    const index = this.authorsArray.indexOf(authors);
    if (index >= 0) {
      this.authorsArray.splice(index, 1);
    }
  }

  /* Add dynamic authors */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.authorsArray.length < 5) {
      
      this.authorsArray.push({ authorName: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }





onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.profileForm.invalid) {
      return;
  }
   let body = this.profileForm.value;
   body.authors = this.authorsArray;
  this.http.post<any>(this.SERVER_URL,body, this.httpOptions).subscribe(
    (res) => {
      alert("Success !!!")
      //console.log(res),
    //this.router.navigate(['home/books-list']);
    this.profileForm.reset();
    this.authorsArray=[];
    (err) => console.log(err)
    }
  );
}


}

