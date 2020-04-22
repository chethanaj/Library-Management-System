import { DueBooksComponent } from './../../due-books/due-books.component';
import { ReserveBookComponent } from './../../reserve-book/reserve-book.component';

import { BookComponent } from '../../book/book.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DemoMaterialModule } from 'src/app/shared/shared.module';
import { AddBookComponent } from 'src/app/add-book/add-book.component';
import { UserComponent } from 'src/app/user/user.component';
import { EditDialogComponent } from 'src/app/book/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from 'src/app/book/dialogs/delete/delete.dialog.component';
import { UserHistoryComponent } from 'src/app/user-history/user-history.component';
import { LendBookComponent } from 'src/app/lend-book/lend-book.component';
import { LendDialogComponent } from 'src/app/lend-book/dialogs/lend/lend.dialog.component';
import { ReserveDialogComponent } from 'src/app/reserve-book/dialogs/reserve/reserve.dialog.component';
import { ReturnBookComponent } from 'src/app/return-book/return-book.component';
import { ReturnDialogComponent } from 'src/app/return-book/dialogs/return/return.dialog.component';
import { DueDialogComponent } from 'src/app/due-books/dialogs/due/due.dialog.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
  
    
  ],
  declarations: [

    BookComponent,
    AddBookComponent,
    UserComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    UserHistoryComponent,
    LendBookComponent,
    LendDialogComponent,
    ReserveBookComponent,
    ReserveDialogComponent,
    ReturnBookComponent,
    ReturnDialogComponent,
    DueBooksComponent,
    DueDialogComponent
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AdminLayoutModule {}
