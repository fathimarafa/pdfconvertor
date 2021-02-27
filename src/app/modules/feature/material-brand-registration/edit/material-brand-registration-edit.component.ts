import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MaterialBrandRegistration } from '../definitions/material-brand.definition';
import { MaterialBrandRegistrationMetadata } from '../material-brand-registration.configuration';

@Component({
  selector: 'app-material-brand-registration-edit',
  templateUrl: './material-brand-registration-edit.component.html',
  styleUrls: ['./material-brand-registration-edit.component.css']
})
export class MaterialBrandRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: MaterialBrandRegistration;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<MaterialBrandRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialBrandRegistration,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = MaterialBrandRegistrationMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<MaterialBrandRegistration> {
    if (this.isEdit) {
      const endPoint = `${MaterialBrandRegistrationMetadata.serviceEndPoint}/${this.model.materialBrandId}`;
      return this.dataHandler.put<MaterialBrandRegistration>(endPoint, this.model);
    } else {
      return this.dataHandler.post<MaterialBrandRegistration>(MaterialBrandRegistrationMetadata.serviceEndPoint, this.model);
    }
  }

}