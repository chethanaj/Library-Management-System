import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { AuthService } from './services/auth.service';
import {AuthGuard} from "./services/auth.guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BookService } from "../app/services/book.service";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import { DemoMaterialModule } from './shared/shared.module';
import { UserHistoryComponent } from './user-history/user-history.component';
import { HistoryService } from './services/history.service';
import { ReservationService } from './services/reservation.service';
import { DueBookService } from './services/dueBook.service';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminLayoutComponent,  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
  ],
  providers: [AuthService,  AuthGuard,BookService,UserService,UserHistoryComponent,HistoryService,ReservationService,DueBookService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
