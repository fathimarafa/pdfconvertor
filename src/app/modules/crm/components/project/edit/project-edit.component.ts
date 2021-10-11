import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../definitions/project.definition';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  showProject: boolean = false;

  projectTypes = [
    { id: 'OP', name: 'Own Project' },
    { id: 'CN', name: 'Normal Project' },
    { id: 'CG', name: 'Goverment Project' }
  ]

  selectedType;

  constructor(
    @Inject(MAT_DIALOG_DATA) private editData: Project,
  ) { }

  ngOnInit(): void {
    if (this.editData && this.editData.projectTypeId) {
      this.selectedType = this.editData.projectTypeId;
      this.showProject = true;
    }
  }

  onProceedBtnClick() {
    this.showProject = true;
  }

}


  // CG - Gov. Projects
  // CN - Consultancy
  // CP - Private Projects
  // OP - Villas and Apartment