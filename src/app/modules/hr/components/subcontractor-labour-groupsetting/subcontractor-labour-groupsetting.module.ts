import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SubcontractorlabourgroupComponent} from './subcontractor-labour-groupsetting.component';
import{SubcontractorlabourgroupEditComponent} from './edit/subcontractor-labour-groupsetting-edit.component';

@NgModule({
  declarations: [SubcontractorlabourgroupComponent, SubcontractorlabourgroupEditComponent],
  imports: [
    CommonModule,
    
  ]
})
export class SubcontractorlabourgroupModule { }
