import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanOrAdvancePaymentEditComponent } from './edit/loan-or-advance-payment-edit.component';
import { LoanOrAdvancePaymentComponent } from './loan-or-advance-payment.component';

@NgModule({
  declarations: [
    LoanOrAdvancePaymentComponent,
    LoanOrAdvancePaymentEditComponent,
  ],
  imports: [CommonModule],
})
export class LoanOrAdvancePaymentModule {}
