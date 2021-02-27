import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GovernmentProjectBookingMetadata } from './government-project-booking.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { GovernmentProjectBooking, GovernmentProjectStatus, IGovernmentBookingForms, GovernmentProjectBookingProjectDetails, GovernmentTenderSubmission, GovernmentOpenTender, GovernmentTenderNegotiation, GovernmentWorkOrder } from './definitions/government-project-booking.definition';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-government-project-booking',
  templateUrl: './government-project-booking.component.html',
  styleUrls: ['./government-project-booking.component.css']
})
export class GovernmentProjectBookingComponent implements OnInit {

  isEdit: boolean;
  projectStatus;
  selectedProjectStatus: GovernmentProjectStatus;
  modalForms: IGovernmentBookingForms;
  tableColumns;
  dataSource;

  constructor(
    private dialogRef: MatDialogRef<GovernmentProjectBookingComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: GovernmentProjectBooking,
    private dataHandler: DataHandlerService
  ) {
    this.projectStatus = GovernmentProjectStatus;
    this.selectedProjectStatus = GovernmentProjectStatus.TenderSubmitted;
    this.defineModalForms();
    this.bindStatusChangeEventListener();
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
  }

  defineModalForms() {
    this.modalForms = {
      projectDetails: {
        form: new FormGroup({}),
        model: {} as GovernmentProjectBookingProjectDetails,
        options: {},
        fields: GovernmentProjectBookingMetadata.formFields.projectDetails
      },
      tenderSubmission: {
        form: new FormGroup({}),
        model: {} as GovernmentTenderSubmission,
        options: {},
        fields: GovernmentProjectBookingMetadata.formFields.tenderSubmission
      },
      openTender: {
        form: new FormGroup({}),
        model: {} as GovernmentOpenTender,
        options: {},
        fields: GovernmentProjectBookingMetadata.formFields.openTender
      },
      tenderNegotiation: {
        form: new FormGroup({}),
        model: {} as GovernmentTenderNegotiation,
        options: {},
        fields: GovernmentProjectBookingMetadata.formFields.tenderNegotiation
      },
      workOrder: {
        form: new FormGroup({}),
        model: {} as GovernmentWorkOrder,
        options: {},
        fields: GovernmentProjectBookingMetadata.formFields.workOrder
      }
    }
  }

  get statusChangeDropdownOptions(): any[] | Observable<any[]> {
    return [
      {
        label: GovernmentProjectStatus.TenderSubmitted,
        value: GovernmentProjectStatus.TenderSubmitted
      },
      {
        label: GovernmentProjectStatus.Negotitated,
        value: GovernmentProjectStatus.Negotitated
      },
      {
        label: GovernmentProjectStatus.TenderOpened,
        value: GovernmentProjectStatus.TenderOpened
      },
      {
        label: GovernmentProjectStatus.WorkOrder,
        value: GovernmentProjectStatus.WorkOrder
      }
    ]
  }

  bindStatusChangeEventListener() {
    for (var formFields of this.modalForms.projectDetails.fields) {
      for (var group of formFields.fieldGroup) {
        const keyToFind = 'changedprojectstatusid';
        if (group.key && (group.key.toString().toLowerCase() === keyToFind)) {
          group.templateOptions.options = this.statusChangeDropdownOptions;
          group.templateOptions.change = (field: FormlyFieldConfig, event: MatSelectChange) => {
            this.selectedProjectStatus = event.value;
          }
          break;
        }
      }
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit(): void {
    this.tableColumns = GovernmentProjectBookingMetadata.tableColumns.tenderNegotiated;
  }

  onSaveBtnClick() {
    console.log(' -- main form valid --')
    // console.log(this.modalForms.main.form.valid);
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

  // get httpRequest(): Observable<GovernmentProjectBooking> {
  //   if (this.isEdit) {
  //     const endPoint = `${GovernmentProjectBookingMetadata.serviceEndPoint}/${this.model.projectId}`;
  //     return this.dataHandler.put<GovernmentProjectBooking>(endPoint, this.model);
  //   } else {
  //     return this.dataHandler.post<GovernmentProjectBooking>(GovernmentProjectBookingMetadata.serviceEndPoint, this.model);
  //   }
  // }

}
