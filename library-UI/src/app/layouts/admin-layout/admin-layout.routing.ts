import { UserComponent } from './../../user/user.component';
import { AddBookComponent } from './../../add-book/add-book.component';

import { Routes } from '@angular/router';

import {BookComponent} from "../../book/book.component";


export const AdminLayoutRoutes: Routes = [
    
    { path : 'home/books-list',   component: BookComponent},
    { path  : 'home/add-book' ,   component :AddBookComponent},
    { path  : 'home/user' ,       component :UserComponent}

];
