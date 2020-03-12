import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BookshelfComponent} from "./bookshelf/bookshelf.component";

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/events',
  //   pathMatch: 'full'
  // },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'bookshelf',
    component: BookshelfComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
