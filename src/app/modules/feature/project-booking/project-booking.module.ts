import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectBookingComponent } from './project-booking.component';
import { ProjectBookingEditComponent } from './edit/project-booking-edit.component';
import { NormalProjectBookingComponent } from './edit/normal-project-booking/normal-project-booking.component';
import { GovernmentProjectBookingComponent } from './edit/government-project-booking/government-project-booking.component';
import { OwnProjectBookingComponent } from './edit/own-project-booking/own-project-booking.component';
import { ProjectBookingStageWorkComponent } from './edit/own-project-booking/edit/project-booking-stage-work/project-booking-stage-work.component';
import { ProjectBookingProjectDetailsComponent } from './edit/own-project-booking/edit/project-booking-project-details/project-booking-project-details.component';
import { ProjectBookingClientDetailsComponent } from './edit/own-project-booking/edit/project-booking-client-details/project-booking-client-details.component';


@NgModule({
  declarations: [
    ProjectBookingComponent,
    ProjectBookingEditComponent,
    NormalProjectBookingComponent,
    GovernmentProjectBookingComponent,
    OwnProjectBookingComponent,
    ProjectBookingStageWorkComponent,
    ProjectBookingProjectDetailsComponent,
    ProjectBookingClientDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProjectBookingComponent
  ],
  entryComponents: [
    ProjectBookingEditComponent
  ]
})
export class ProjectBookingModule { }
