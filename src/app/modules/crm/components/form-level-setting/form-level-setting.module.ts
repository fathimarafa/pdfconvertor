import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLevelSettingComponent } from './form-level-setting.component';
import { FormLevelSettingEditComponent } from './edit/form-level-setting-edit.component';



@NgModule({
  declarations: [FormLevelSettingComponent, FormLevelSettingEditComponent],
  imports: [
    CommonModule
  ]
})
export class FormLevelSettingModule { }
