import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SubcontractorlabourgroupattendanceComponent} from './subcontractor-labour-groupattendancesetting.component';

import { SubcontractorlabourgroupattendanceEditComponent} from './edit/subcontractor-labour-groupattendancesetting-edit.component';

@NgModule({
  declarations: [SubcontractorlabourgroupattendanceComponent, SubcontractorlabourgroupattendanceEditComponent],
  imports: [
    CommonModule,
    
  ]
})
export class SubcontractorlabourgroupattendancesettingModule { }
