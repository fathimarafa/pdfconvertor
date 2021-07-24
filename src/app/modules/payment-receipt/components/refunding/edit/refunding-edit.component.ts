import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { RefundingMetadata } from '../refunding.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Refund } from '../definitions/refunding.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';
import { ProjectMetadata } from 'src/app/modules/crm/components/project/project.configuration';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { ProjectStatusMetadata } from 'src/app/modules/crm/components/project-status/project-status.configuration';

@Component({
  selector: 'app-refunding-edit',
  templateUrl: './refunding-edit.component.html',
  styleUrls: ['./refunding-edit.component.css']
})
export class RefundingEditComponent implements OnInit {

  form = new FormGroup({});
  model: Refund;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  projectList: Project[];

  constructor(
    private dialogRef: MatDialogRef<RefundingEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: Refund,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
  }

  ngOnInit(): void {
    this.fields = RefundingMetadata.formFields['type-1'];
    this.model = this.editData;
    this.bindFormEvents();
  }

  bindFormEvents() {
    FormfieldHandler.initialize(this.fields);
    this.loadProjects();
    this.onRefundTypeChange();
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

  get httpRequest(): Observable<Refund> {
    this.bindDefaultValue();
    if (this.isEdit) {
      return this.dataHandler.put<Refund>(RefundingMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<Refund>(RefundingMetadata.serviceEndPoint, this.model);
    }
  }

  bindDefaultValue() {
    this.model.performanceguarantee = this.model.performanceguarantee || 0;
    this.model.masterId = this.model.masterId || 0;
    this.model.paymentMode = this.model.paymentMode || '';
    this.model.paymentModeId = this.model.paymentModeId || 0;
    this.model.paymentNo = this.model.paymentMode || '';
    this.model.narration = this.model.narration || '';
  }

  private loadProjects() {
    if (!this.projectList) {
      this.dataHandler.get<Project[]>(ProjectMetadata.serviceEndPoint).subscribe((res: Project[]) => {
        if (res) {
          this.projectList = res;
          this.bindProjectSelectoptions()
        }
      });
    } else {
      this.bindProjectSelectoptions();
    }
  }

  private bindProjectSelectoptions() {
    FormfieldHandler.projectDropdown.templateOptions.options = this.projectList.map((e: Project) => (
      {
        label: e.projectId,
        value: e.id
      }
    ));
    this.onProjectChange();
  }

  private onProjectChange() {
    FormfieldHandler.projectDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      if (this.model.refundType === 1) {
        this.getTendorSubmit();
      }
      if (this.model.refundType === 2) {
        this.getSecurityDeposit();
      }
      const selectedProject = this.projectList.find(e => e.id === this.model.projectId);
      this.model['departmentId'] = selectedProject.departmentId;
      this.model['projectName'] = selectedProject.projectName;
      this.model['clientName'] = `${selectedProject.firstName} ${selectedProject.lastName}`;
      this.model = { ...this.model };
    }
  }

  private onRefundTypeChange() {
    FormfieldHandler.refundTypeDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      const refundType = this.model.refundType;
      // switch (refundType) {
      //   case 1:
      //     this.fields = RefundingMetadata.formFields['type-1'];
      //     FormfieldHandler.refundAmountDropdown.templateOptions.label = 'EMD';
      //     break;
      //   case 2:
      //     this.fields = RefundingMetadata.formFields['type-1'];
      //     FormfieldHandler.refundAmountDropdown.templateOptions.label = 'Security Deposit';
      //     break;
      //   case 3:
      //     this.fields = RefundingMetadata.formFields['type-2'];
      //     break;
      //   case 4:
      //     this.fields = RefundingMetadata.formFields['type-2'];
      //     break;
      // }
      if (refundType > 2) {
        this.fields = RefundingMetadata.formFields['type-2'];
      } else {
        this.fields = RefundingMetadata.formFields['type-1'];
      }
      this.form.reset();
      this.model.refundType = refundType;
      this.model = { ...this.model };
      this.bindFormEvents();
      if (refundType === 1) {
        FormfieldHandler.refundAmountDropdown.templateOptions.label = 'EMD';
      }
      if (refundType === 2) {
        FormfieldHandler.refundAmountDropdown.templateOptions.label = 'Security Deposit';
      }
    }
  }

  getTendorSubmit() {
    const endpoint = `${ProjectStatusMetadata.serviceEndpoint.tendersubmit}/${this.model.projectId}`;
    this.dataHandler.get(endpoint).subscribe((res: any) => {
      this.bindRefundAmount(res);
    })
  }

  getSecurityDeposit() {
    const endpoint = `${ProjectStatusMetadata.serviceEndpoint.tenderworkorder}/${this.model.projectId}`;
    this.dataHandler.get(endpoint).subscribe((res: any) => {
      this.bindRefundAmount(res);
    })
  }

  bindRefundAmount(res) {
    if (res && res.length) {
      this.model.masterId = res[0].id;
      this.model.refundAmount = res[0].emdAmount || res[0].securityDepositAmount;
      this.model.paymentMode = res[0].emdType || res[0].securityDepositType;
    } else {
      this.model.masterId = 0;
      this.model.refundAmount = null;
      this.model.paymentMode = null;
    }
    this.model = { ...this.model };
  }

  ngOnDestroy() {
    this.form.reset();
  }

}
