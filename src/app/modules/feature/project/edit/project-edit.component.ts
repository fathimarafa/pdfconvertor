import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../definitions/project.definition';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  selectedValue;
  favoriteSeason: string;
  projectTypes: string[] = ['Own Project', 'Normal Project', 'Government Project'];
  selectedProjectType;
  constructor(
    @Inject(MAT_DIALOG_DATA) private editData: Project,
  ) { }

  ngOnInit(): void {
    if(this.editData.projectTypeId === 'CG'){
      this.selectedProjectType = 'Government Project';
    }
    this.onProceedBtnClick();
  }

  onRadioBtnClick(value) {
    this.selectedProjectType = value;
  }

  onProceedBtnClick(ele?) {
    if (!this.selectedProjectType) {
      return;
    }
    switch (this.selectedProjectType) {
      case 'Own Project':
        this.selectedValue = 'One';
        break;
      case 'Normal Project':
        this.selectedValue = 'Two';
        break;
      case 'Government Project':
        this.selectedValue = 'Three';
        break;
    }
  }

}
