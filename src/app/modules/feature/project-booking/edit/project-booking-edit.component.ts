import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-booking-edit',
  templateUrl: './project-booking-edit.component.html',
  styleUrls: ['./project-booking-edit.component.css']
})
export class ProjectBookingEditComponent implements OnInit {

  selectedValue;
  favoriteSeason: string;
  projectTypes: string[] = ['Own Project', 'Normal Project', 'Government Project'];
  selectedProjectType;
  constructor() { }

  ngOnInit(): void {
  }

  onRadioBtnClick(value) {
    this.selectedProjectType = value;
  }

  onProceedBtnClick(ele) {
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
