import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialReceivedComponent } from './material-received.component';
import { MaterialReceivedEditComponent } from './edit/material-received-edit.component';

@NgModule({
  declarations: [MaterialReceivedComponent, MaterialReceivedEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialReceivedModule { }
