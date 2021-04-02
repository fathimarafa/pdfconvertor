import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowUpComponent } from './follow-up.component';
import { FollowUpEditComponent } from './edit/follow-up-edit.component';



@NgModule({
  declarations: [FollowUpComponent, FollowUpEditComponent],
  imports: [
    CommonModule
  ],
  exports: [FollowUpComponent],
  entryComponents: [FollowUpEditComponent]
})
export class FollowUpModule { }
