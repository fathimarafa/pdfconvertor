import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ModuleMetadataService } from '../../../services/module-metadata/module.metadata.service';
import { ServerCommunicationService } from '../../../services/server-communication/server.communication.service';

@Component({
  selector: 'app-module-default-form',
  templateUrl: './module-default-form.component.html',
  styleUrls: ['./module-default-form.component.css']
})
export class ModuleDefaultFormComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private moduleMetadataService: ModuleMetadataService,
    private serverCommunicationService: ServerCommunicationService
  ) {
    this.initializeFormFields();
  }

  initializeFormFields() {
    this.moduleMetadataService.getFormMetaData().then((res: any[]) => {
      this.fields = res;
    });
  }

  ngOnInit(): void { }

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
      this.serverCommunicationService.saveData(this.model).then((res) => {
        alert('data saved successfully');
      }).catch((err) => {
        console.error(err);
      })
    }
  }

}
