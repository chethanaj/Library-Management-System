import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

import * as jwt_decode from "jwt-decode";

@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:8081/api/register";
  private _loginUrl = "http://localhost:8081/api/signin";
  private _validAdmin = "http://localhost:8081/api/valid/admin";

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('userId');
    localStorage.removeItem('userLogo');
    this._router.navigate(['/']);
  }


  loggedIn() {
    return !!localStorage.getItem('token');
  }

  isAdminLogin(){
    
    // if(this.loggedIn){
      let roles = localStorage.getItem('roles');
      console.log(roles);
      console.log(roles.indexOf('LIBADMIN'));
      return roles.indexOf('LIBADMIN') != -1;
    // }

    // return true;
  }


}
