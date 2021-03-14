import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialTransferRequestComponent } from './material-transfer-request.component';
import { MaterialTransferRequestEditComponent } from './edit/material-transfer-request-edit.component';

@NgModule({
  declarations: [MaterialTransferRequestComponent, MaterialTransferRequestEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialTransferRequestModule { }
