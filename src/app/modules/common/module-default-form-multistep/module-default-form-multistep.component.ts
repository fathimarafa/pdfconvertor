import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ModuleMetadataService } from '../../../services/module-metadata/module.metadata.service';
import { ServerCommunicationService } from '../../../services/server-communication/server.communication.service';

export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-module-default-form-multistep',
  templateUrl: './module-default-form-multistep.component.html',
  styleUrls: ['./module-default-form-multistep.component.css']
})
export class ModuleDefaultFormMultistepComponent implements OnInit {

  activedStep = 0;
  model = {};
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];

  constructor(
    private moduleMetadataService: ModuleMetadataService,
    private serverService: ServerCommunicationService
  ) { }

  ngOnInit(): void {
    this.loadFormMetadata();
  }

  loadFormMetadata() {
    this.moduleMetadataService
      .getFormMetaData()
      .then(res => {
        this.steps = res;
        this.form = new FormArray(this.steps.map(() => new FormGroup({})));
        this.options = this.steps.map(() => <FormlyFormOptions>{});
      })
      .catch(err => {
        console.error(err);
      });
  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
      this.serverService.saveData(this.model).then((res) => {
        alert('data saved successfully');
      }).catch((err) => {
        console.error(err);
      })
    }
  }
}
