import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialIssueComponent } from './material-issue.component';
import { MaterialIssueEditComponent } from './edit/material-issue-edit.component';

@NgModule({
  declarations: [MaterialIssueComponent, MaterialIssueEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialIssueModule { }
