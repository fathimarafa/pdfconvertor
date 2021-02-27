import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MaterialRegistration } from '../definitions/material-registration.definition';
import { MaterialRegistrationMetadata } from '../material-registration.configuration';

@Component({
  selector: 'app-material-registration-edit',
  templateUrl: './material-registration-edit.component.html',
  styleUrls: ['./material-registration-edit.component.css']
})
export class MaterialRegistrationEditComponent implements OnInit {

  modalForms;// = new FormGroup({});
  // model: MaterialRegistration;
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[];
  isEdit: boolean;
  tableColumns;
  dataSource;
  addedStocks = [];

  constructor(
    private dialogRef: MatDialogRef<MaterialRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialRegistration,
    private dataHandler: DataHandlerService
  ) {
    this.defineModalForms();
    // this.fields = MaterialRegistrationMetadata.formFields;
    // this.model = this.editData;
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
  }

  ngOnInit(): void {
    this.tableColumns = MaterialRegistrationMetadata.openingStock.tableColumns;
   }

  defineModalForms() {
    this.modalForms = {
      material: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: MaterialRegistrationMetadata.formFields
      },
      stock: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: MaterialRegistrationMetadata.openingStock.formFields
      }
    }
  }

  onSaveBtnClick() {
    if (this.modalForms.material.model.openingStock >= 1) {
      if (this.addedStocks.length < 1) {
        return;
      }
    }
    if (this.modalForms.material.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.modalForms.material.model
        }
        this.dialogRef.close(closeEvent);
      });
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<MaterialRegistration> {
    if (this.isEdit) {
      const endPoint = `${MaterialRegistrationMetadata.serviceEndPoint}/${this.modalForms.material.model.materialUID}`;
      return this.dataHandler.put<MaterialRegistration>(endPoint, this.modalForms.material.model);
    } else {
      return this.dataHandler.post<MaterialRegistration>(MaterialRegistrationMetadata.serviceEndPoint, this.modalForms.material.model);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

}