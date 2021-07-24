import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientAdvanceComponent } from './client-advance.component';
import { ClientAdvanceEditComponent } from './edit/client-advance-edit.component';



@NgModule({
  declarations: [ClientAdvanceComponent, ClientAdvanceEditComponent],
  imports: [
    CommonModule
  ]
})
export class ClientAdvanceModule { }
