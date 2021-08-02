import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaySettingComponent } from './holiday-setting.component';
import { HolidaySettingEditComponent } from './edit/holiday-setting-edit.component';

@NgModule({
  declarations: [HolidaySettingComponent, HolidaySettingEditComponent],
  imports: [CommonModule],
})
export class HolidaySettingModule {}
