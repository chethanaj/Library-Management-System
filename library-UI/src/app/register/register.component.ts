import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  registerUserForm = this.formBuilder.group({
    username:[''],
    password:[''],
    firstName:[''],
    lastName:[''],
    contactNumber:[''],
    address:this.formBuilder.group({
      streetNumber:'',
      city:'',
      country:''

    }),
    roles:[]
     
  });

  rolesArray: Role[] = [];
  checkIfOthersAreSelected: boolean;
  

  constructor(private formBuilder: FormBuilder,private _auth: AuthService,
              private _router: Router) { }

 isChecked: boolean;
 isCheckedName: any;
 //checkboxData = ["Admin","User"];
 checkboxData = ["User"];
 onChange(e){ 
   this.rolesArray = [];      
    this.isChecked = !this.isChecked;
    this.isCheckedName = e.target.name;
    let body = this.registerUserForm.value;
    if(this.isCheckedName=="User"){
     this.rolesArray.push({name:"LIBUSER"});
     
    }else{
    
    this.rolesArray.push({name:"LIBADMIN"});
  }
  }
             
  ngOnInit() {
  }



  registerUser() {
    this.registerUserForm.value.roles = this.rolesArray;
    let form = JSON.stringify(this.registerUserForm.value);
    form = JSON.parse(form);
    this._auth.registerUser(form)
    .subscribe(
      res => {
        
        this._router.navigate(['/'])
      },
      err => console.log(err)
    )      
  }


}
export interface Role {
  //id:number;
  name: string;

}