import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-project-booking-project-details',
  templateUrl: './project-booking-project-details.component.html',
  styleUrls: ['./project-booking-project-details.component.css']
})
export class ProjectBookingProjectDetailsComponent implements OnInit {

  form = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor() { }

  ngOnInit(): void {
  }

}
