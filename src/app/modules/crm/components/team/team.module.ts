import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { TeamEditComponent } from './edit/team-edit.component';



@NgModule({
  declarations: [TeamComponent, TeamEditComponent],
  imports: [
    CommonModule
  ]
})
export class TeamModule { }
