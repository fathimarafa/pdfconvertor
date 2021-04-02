import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalVoucherEntryComponent } from './journal-voucher-entry.component';
import { JournalVoucherEntryEditComponent } from './edit/journal-voucher-entry-edit.component';

@NgModule({
  declarations: [JournalVoucherEntryComponent, JournalVoucherEntryEditComponent],
  imports: [
    CommonModule
  ]
})
export class JournalVoucherEntryModule { }
