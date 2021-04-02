import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountHeadRegistrationComponent } from './account-head-registration.component';
import { AccountHeadRegistrationEditComponent } from './edit/account-head-registration-edit.component';

@NgModule({
  declarations: [AccountHeadRegistrationComponent, AccountHeadRegistrationEditComponent],
  imports: [
    CommonModule
  ]
})
export class AccountHeadRegistrationModule { }
