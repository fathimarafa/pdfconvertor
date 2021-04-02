import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialReceivedComponent } from './material-received.component';
import { MaterialReceivedEditComponent } from './edit/material-received-edit.component';
import { SelectTransferComponent } from './edit/select-transfer/select-transfer.component';



@NgModule({
  declarations: [MaterialReceivedComponent, MaterialReceivedEditComponent, SelectTransferComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialReceivedModule { }
