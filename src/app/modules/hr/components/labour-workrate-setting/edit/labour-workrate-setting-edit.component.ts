import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { LabourWorkRateSettingMetadata } from '../labour-workrate-setting.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { LabourWorkRate } from '../definitions/labour-workrate-setting.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { UnitRegistrationMetadata } from 'src/app/modules/material/components/unit-registration/unit-registration.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { UnitRegistration } from 'src/app/modules/material/components/unit-registration/definitions/unit-registration.definition';

@Component({
  selector: 'app-labour-workrate-setting-edit',
  templateUrl: './labour-workrate-setting-edit.component.html',
  styleUrls: ['./labour-workrate-setting-edit.component.css']
})
export class LabourWorkrateSettingEditComponent implements OnInit {

  form = new FormGroup({});
  model: LabourWorkRate;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<LabourWorkrateSettingEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: LabourWorkRate,
    private dataHandler: DataHandlerService,
    private authSerivce: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = LabourWorkRateSettingMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void {
    this.loadUnit();
  }

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

  get httpRequest(): Observable<LabourWorkRate> {
    if (this.isEdit) {
      const endPoint = `${LabourWorkRateSettingMetadata.serviceEndPoint}/${this.model.id}`;
      return this.dataHandler.put<LabourWorkRate>(endPoint, this.model);
    } else {
      return this.dataHandler.post<LabourWorkRate>(LabourWorkRateSettingMetadata.serviceEndPoint, this.model);
    }
  }

  private get unitDropdown(): FormlyFieldConfig {
    return this.fields.find((x: FormlyFieldConfig) => x.key === 'unitId');
  }

  private loadUnit() {
    this.dataHandler.get(this.unitServiceUrl)
      .subscribe((res: UnitRegistration[]) => {
        if (res) {
          this.unitDropdown.templateOptions.options = res.map((e: UnitRegistration) => (
            {
              label: e.unitLongName,
              value: e.unitId
            }
          ));
        }
      });
  }

  private get unitServiceUrl() {
    const user = this.authSerivce.loggedInUser;
    return `${UnitRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

}
