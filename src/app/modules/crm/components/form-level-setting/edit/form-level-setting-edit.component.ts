import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormLevelSettingMetadata } from '../form-level-setting.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { FormLevelSetting } from '../definitions/form-level-setting.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-level-setting-edit',
  templateUrl: './form-level-setting-edit.component.html',
  styleUrls: ['./form-level-setting-edit.component.css']
})
export class FormLevelSettingEditComponent implements OnInit {


  form = new FormGroup({});
  model;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<FormLevelSettingEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: FormLevelSetting[],
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    // this.fields = FormLevelSettingMetadata.formFields;
    this.model = {};
    this.generateFormFields();
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
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

  get httpRequest(): Observable<FormLevelSetting> {
    if (this.isEdit) {
      return this.dataHandler.put<FormLevelSetting>(FormLevelSettingMetadata.serviceEndPoint.level, this.model);
    } else {
      return this.dataHandler.post<FormLevelSetting>(FormLevelSettingMetadata.serviceEndPoint.level, this.model);
    }
  }

  generateFormFields() {

    let fields = [
      {
        fieldGroupClassName: "display-flex",
        fieldGroup: []
      }
    ];
    let i = 0;

    for (let x in this.editData) {

      if (fields[fields.length - 1].fieldGroup.length > 3) {
        fields.push(
          {
            fieldGroupClassName: "display-flex",
            fieldGroup: []
          }
        );
        i++;
      }

      fields[fields.length - 1].fieldGroup.push(
        {
          className: 'flex-1',
          type: 'input',
          key: this.editData[x].menuId,
          defaultValue: this.editData[x].formlevel,
          templateOptions: {
            label: this.editData[x]['menuName'],
            required: true,
            type: 'number'
          }
        }
      )

    }

    this.fields = fields;
  }

}
