import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-project-booking-client-details',
  templateUrl: './project-booking-client-details.component.html',
  styleUrls: ['./project-booking-client-details.component.css']
})
export class ProjectBookingClientDetailsComponent implements OnInit {

  form = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor() { }

  ngOnInit(): void {
  }

}
