import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveSettingComponent } from './leave-setting.component';
import { LeaveSettingEditComponent } from './edit/leave-setting-edit.component';



@NgModule({
  declarations: [LeaveSettingComponent, LeaveSettingEditComponent],
  imports: [
    CommonModule
  ]
})
export class LeaveSettingModule { }
