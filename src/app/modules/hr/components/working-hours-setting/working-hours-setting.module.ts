import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkingHoursSettingComponent } from './working-hours-setting.component';
import { WorkingHoursSettingEditComponent } from './edit/working-hours-setting-edit.component';

@NgModule({
  declarations: [
    WorkingHoursSettingComponent,
    WorkingHoursSettingEditComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [
    WorkingHoursSettingEditComponent
  ],
  exports: [
    WorkingHoursSettingComponent
  ]
})
export class WorkingHoursSettingModule { }
