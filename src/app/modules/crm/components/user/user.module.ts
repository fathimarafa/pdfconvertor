import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserEditComponent } from './edit/user-edit.component';

@NgModule({
  declarations: [UserComponent, UserEditComponent],
  imports: [
    CommonModule
  ],
  exports: [UserComponent],
  entryComponents: [UserEditComponent]
})
export class UserModule { }
