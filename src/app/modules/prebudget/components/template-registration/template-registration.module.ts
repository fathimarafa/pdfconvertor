import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRegistrationComponent } from './template-registration.component';
import { TemplateRegistrationEditComponent } from './edit/template-registration-edit.component';

@NgModule({
  declarations: [TemplateRegistrationComponent, TemplateRegistrationEditComponent],
  imports: [
    CommonModule
  ]
})
export class TemplateRegistrationModule { }
