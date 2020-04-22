import { User } from './../models/user';


import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {
  
  private readonly VIEW_USER = 'http://localhost:8081/customer-api/customer';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  'Bearer '+localStorage.getItem('token'),
      'Content-Type': 'application/json',
    })
  };


  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllUsers(): void {
    this.httpClient.get<User[]>(this.VIEW_USER,this.httpOptions).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

}






