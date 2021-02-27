import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ProjectEnquiryMetadata } from '../project-enquiry.configuration';
import { ProjectEnquiry } from '../definitions/project-enquiry.definition';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { UserMetadata } from '../../user/user.configuration';
import { User } from '../../user/definitions/user.definition';
import { EnquiryMode } from '../../enquiry-mode/definitions/enquiry-mode.definition';
import { EnquiryStatus } from '../../enquiry-status/definition/enquiry-status.definition';
import { EnquiryFor } from '../../enquiry-for/definition/enquiry-for.definition';
import { EnquiryModeMetadata } from '../../enquiry-mode/enquiry-mode.configuration';
import { EnquiryStatusMetadata } from '../../enquiry-status/enquiry-status.configuration';
import { EnquiryForMetadata } from '../../enquiry-for/enquiry-for.configuration';

export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}
@Component({
  selector: 'app-project-enquiry-edit',
  templateUrl: './project-enquiry-edit.component.html',
  styleUrls: ['./project-enquiry-edit.component.css']
})
export class ProjectEnquiryEditComponent implements OnInit {

  activedStep = 0;
  model: ProjectEnquiry;
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<ProjectEnquiryEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ProjectEnquiry,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.model = this.editData;
  }

  ngOnInit(): void {
    this.steps = ProjectEnquiryMetadata.formFields;
    this.bindFormInputSelectOptions();
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});
  }

  bindFormInputSelectOptions() {
    this.setUserSelectOptions();
    this.setModeofEnquirySelectOptions();
    this.setEnquiryStatusSelectOptions();
    this.setEnquiryForSelectOptions();
  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

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

  get httpRequest(): Observable<ProjectEnquiry> {
    if (this.isEdit) {
      return this.dataHandler.put<ProjectEnquiry>(ProjectEnquiryMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<ProjectEnquiry>(ProjectEnquiryMetadata.serviceEndPoint, this.model);
    }
  }

  private setUserSelectOptions() {
    this.dataHandler.get<User[]>(UserMetadata.serviceEndPoint).subscribe((res: User[]) => {
      if (res) {
        const keysToMatch: string[] = ['assignstaffid', 'nextstaff','marketingteam'];
        const userList: object[] = res.map((e: User) => (
          { label: e.fullName, value: e.id }
        ));
        this.steps.forEach((step: StepType) => {
          step.fields.forEach((field: FormlyFieldConfig) => {
            if (field.key) {
              if (keysToMatch.includes(field.key.toString().toLowerCase())) {
                field.templateOptions.options = userList;
              }
            }
            if (field.fieldGroup) {
              field.fieldGroup.forEach((groupfield: FormlyFieldConfig) => {
                if (keysToMatch.includes(groupfield.key.toString().toLowerCase())) {
                  groupfield.templateOptions.options = userList;
                }
              })
            }
          })
        });
      }
    });
  }

  private setModeofEnquirySelectOptions() {
    this.dataHandler.get<EnquiryMode[]>(EnquiryModeMetadata.serviceEndPoint).subscribe((res: EnquiryMode[]) => {
      if (res) {
        let isMatchFound: boolean;
        for (let step of this.steps) {
          for (let field of step.fields) {
            if (field.key === 'modeofEnquiryid') {
              field.templateOptions.options = res.map((e: EnquiryMode) => (
                { label: e.mode, value: e.id }
              ));
              isMatchFound = true;
              break;
            }
          }
          if (isMatchFound) { // stop iteration
            break;
          }
        }
      }
    });
  }

  private setEnquiryForSelectOptions() {
    this.dataHandler.get<EnquiryFor[]>(EnquiryForMetadata.serviceEndPoint).subscribe((res: EnquiryFor[]) => {
      if (res) {
        let isMatchFound: boolean;
        for (let step of this.steps) {
          for (let field of step.fields) {
            if (field.key === 'enquiryfor') {
              field.templateOptions.options = res.map((e: EnquiryFor) => (
                { label: e.enquiry_For, value: e.id }
              ));
              isMatchFound = true;
              break;
            }
          }
          if (isMatchFound) { // stop iteration
            break;
          }
        }
      }
    });
  }

  private setEnquiryStatusSelectOptions() {
    this.dataHandler.get<EnquiryStatus>(EnquiryStatusMetadata.serviceEndPoint).subscribe((res: any) => {
      if (res) {
        let isMatchFound: boolean;
        for (let step of this.steps) {
          for (let field of step.fields) {
            if (field.fieldGroup) {
              for (let groupfield of field.fieldGroup) {
                if (groupfield.key === 'status') {
                  groupfield.templateOptions.options = res.map((e: EnquiryStatus) => (
                    { label: e.status, value: e.enquiryStatusId }
                  ));
                  isMatchFound = true;
                  break;
                }
              }
            }
            if (isMatchFound) { // stop iteration
              break;
            }
          }
          if (isMatchFound) { // stop iteration
            break;
          }
        }
      }
    });
  }

}
