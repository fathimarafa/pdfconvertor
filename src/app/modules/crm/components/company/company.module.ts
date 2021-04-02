import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyEditComponent } from './edit/company-edit.component';

@NgModule({
  declarations: [CompanyComponent, CompanyEditComponent],
  imports: [
    CommonModule
  ],
  exports: [CompanyComponent],
  entryComponents: [CompanyEditComponent]
})
export class CompanyModule { }
