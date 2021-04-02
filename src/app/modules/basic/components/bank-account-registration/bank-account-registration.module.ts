import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountRegistrationComponent } from './bank-account-registration.component';
import { BankAccountRegistrationEditComponent } from './edit/bank-account-registration-edit.component';

@NgModule({
  declarations: [BankAccountRegistrationComponent, BankAccountRegistrationEditComponent],
  imports: [
    CommonModule
  ]
})
export class BankAccountRegistrationModule { }
