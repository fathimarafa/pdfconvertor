import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupComponent } from './user-group.component';
import { UserGroupEditComponent } from './edit/user-group-edit.component';

@NgModule({
  declarations: [UserGroupComponent, UserGroupEditComponent],
  imports: [
    CommonModule
  ],
  exports: [UserGroupComponent, UserGroupEditComponent],
  entryComponents: [UserGroupEditComponent]
})
export class UserGroupModule { }
