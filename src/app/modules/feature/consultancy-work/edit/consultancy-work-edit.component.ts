import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ConsultancyWorkMetadata } from '../consultancy-work.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { ConsultancyWork } from '../definitions/consultany-work.definition';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consultancy-work-edit',
  templateUrl: './consultancy-work-edit.component.html',
  styleUrls: ['./consultancy-work-edit.component.css']
})
export class ConsultancyWorkEditComponent implements OnInit {

  form = new FormGroup({});
  model: ConsultancyWork;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<ConsultancyWorkEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ConsultancyWork,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = ConsultancyWorkMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      // this.model.unitRate = 20;
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<ConsultancyWork> {
    if (this.isEdit) {
      return this.dataHandler.put<ConsultancyWork>(ConsultancyWorkMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<ConsultancyWork>(ConsultancyWorkMetadata.serviceEndPoint, this.model);
    }
  }

}
