import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualBoqComponent } from './manual-boq.component';
import { ManualBoqEditComponent } from './edit/manual-boq-edit.component';


@NgModule({
  declarations: [ManualBoqComponent, ManualBoqEditComponent],
  imports: [
    CommonModule
  ]
})
export class ManualBoqModule { }
