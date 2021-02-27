import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-project-booking-stage-work',
  templateUrl: './project-booking-stage-work.component.html',
  styleUrls: ['./project-booking-stage-work.component.css']
})
export class ProjectBookingStageWorkComponent implements OnInit {

  @Input() metadata;

  form = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor() { }

  ngOnInit(): void {
  }

}
