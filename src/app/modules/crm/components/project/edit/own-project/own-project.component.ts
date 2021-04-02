import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { OwnProjectMetadata } from './own-project.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../../services/datahandler/datahandler.service';
import { OwnProject } from './definitions/own-project.definition';
// import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-own-project',
  templateUrl: './own-project.component.html',
  styleUrls: ['./own-project.component.css']
})
export class OwnProjectComponent implements OnInit {

  // form = new FormGroup({});
  // model: OwnProject;
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[];
  isEdit: boolean;

  modalForms = {
    main: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: OwnProjectMetadata.formFields
    },
    child: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: OwnProjectMetadata.childFormFields
    }
  }

  tableColumns;
  dataSource;

  constructor(
    private dialogRef: MatDialogRef<OwnProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: OwnProject,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    // this.fields = OwnProjectMetadata.formFields;
    // this.model = this.editData;
    // this.model.projectTypeId = 'CG';
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit(): void {
    this.tableColumns = OwnProjectMetadata.tableColumns
  }

  onSaveBtnClick() {
    console.log(' -- main form valid --')
    console.log(this.modalForms.main.form.valid);
    console.log(' -- child form valid --')
    console.log(this.modalForms.child.form.valid);
    // if (this.form.valid) {
    //   this.model.projectId = this.model.projectId || Math.round(Math.random() * 100).toString();
    //   this.model['id'] = this.model.projectId
    //   this.httpRequest.subscribe((res) => {
    //     const closeEvent: IDialogEvent = {
    //       action: this.isEdit ? DialogActions.edit : DialogActions.add,
    //       data: this.model
    //     }
    //     this.dialogRef.close(closeEvent);
    //   })
    // }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  // get httpRequest(): Observable<OwnProject> {
  //   if (this.isEdit) {
  //     const endPoint = `${OwnProjectMetadata.serviceEndPoint}/${this.model.projectId}`;
  //     return this.dataHandler.put<OwnProject>(endPoint, this.model);
  //   } else {
  //     return this.dataHandler.post<OwnProject>(OwnProjectMetadata.serviceEndPoint, this.model);
  //   }
  // }

}
