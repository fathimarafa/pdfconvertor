import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StageWorkMetadata } from './stage-work.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { ProjectStageWork } from './definitions/stage-work.definition';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
// import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-stage-work',
  templateUrl: './stage-work.component.html',
  styleUrls: ['./stage-work.component.css']
})
export class StageWorkComponent implements OnInit {

  // form = new FormGroup({});
  // model: ProjectStageWork;
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[];
  isEdit: boolean;

  modalForms = {
    main: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: StageWorkMetadata.formFields
    },
    child: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: StageWorkMetadata.childFormFields
    }
  }

  tableColumns;
  dataSource;

  constructor(
    private dialogRef: MatDialogRef<StageWorkComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ProjectStageWork,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    // this.fields = StageWorkMetadata.formFields;
    // this.model = this.editData;
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit(): void {
    this.tableColumns = StageWorkMetadata.tableColumns
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

  // get httpRequest(): Observable<ProjectStageWork> {
  //   if (this.isEdit) {
  //     const endPoint = `${StageWorkMetadata.serviceEndPoint}/${this.model.projectId}`;
  //     return this.dataHandler.put<ProjectStageWork>(endPoint, this.model);
  //   } else {
  //     return this.dataHandler.post<ProjectStageWork>(StageWorkMetadata.serviceEndPoint, this.model);
  //   }
  // }

}
