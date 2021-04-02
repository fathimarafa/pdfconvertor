import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabourWorkrateSettingComponent } from './labour-workrate-setting.component';
import { LabourWorkrateSettingEditComponent } from './edit/labour-workrate-setting-edit.component';



@NgModule({
  declarations: [LabourWorkrateSettingComponent, LabourWorkrateSettingEditComponent],
  imports: [
    CommonModule
  ]
})
export class LabourWorkrateSettingModule { }
