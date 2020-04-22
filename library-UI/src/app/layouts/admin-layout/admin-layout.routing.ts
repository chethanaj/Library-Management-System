import { DueBooksComponent } from './../../due-books/due-books.component';
import { ReturnBookComponent } from './../../return-book/return-book.component';
import { LendBookComponent } from './../../lend-book/lend-book.component';
import { UserHistoryComponent } from './../../user-history/user-history.component';
import { UserComponent } from './../../user/user.component';
import { AddBookComponent } from './../../add-book/add-book.component';

import { Routes } from '@angular/router';

import {BookComponent} from "../../book/book.component";
import { ReserveBookComponent } from 'src/app/reserve-book/reserve-book.component';


export const AdminLayoutRoutes: Routes = [
    
    { path : 'home/books-list',   component: BookComponent},
    { path  : 'home/add-book' ,   component :AddBookComponent},
    { path  : 'home/user' ,       component :UserComponent},
    { path  : 'home/user-history' , component :UserHistoryComponent},
    { path : 'home/lend-book',   component: LendBookComponent},
    { path : 'home/reserve-book',   component: ReserveBookComponent},
    { path : 'home/return-book',   component: ReturnBookComponent},
    { path : 'home/due-book',   component: DueBooksComponent},

    

];
