import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { SubContractorWorkOrder, SubContractorWorkOrderDetails } from '../../../subcontractor-work-order/definitions/subcontractor-work-order.definition';
import { SubcontractorWorkOrderEditComponent } from '../../../subcontractor-work-order/edit/subcontractor-work-order-edit.component';
import { SubcontractorWorkOrderMetadata } from '../../../subcontractor-work-order/subcontractor-work-order.configuration';
import { FormGroup } from '@angular/forms';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';
import { LabourWorkRateSettingMetadata } from '../../../labour-workrate-setting/labour-workrate-setting.configuration';
import { LabourWorkRate } from '../../../labour-workrate-setting/definitions/labour-workrate-setting.definition';
// import { FormfieldHandler, ModalFormFields } from 'src/app/modules/hr/components/subcontractor-work-bill/handlers/form-field.handler';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { FormfieldHandler, ModalFormFields } from 'src/app/modules/hr/components/subcontractor-work-order/handlers/form-field.handler';

@Component({
  selector: 'app-additional-bill',
  templateUrl: './additional-bill.component.html',
  styleUrls: ['./additional-bill.component.css']
})
export class AdditionalBillComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  enableItemEdit: boolean;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private router: Router,
    private stateService: AppStateService,
    private dialogRef: MatDialogRef<SubcontractorWorkOrderEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: SubContractorWorkOrder,
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
      
    }
    this.calculateOrderTotal();
    this.defineModalForms();
    this.loadDropdowns();
    
   
  }

  calculateOrderTotal() {
    if (this.isEdit) {
      this.editData.subContractorWorkOrderDetails.forEach((e: SubContractorWorkOrderDetails) => e['total'] = e.quantityOrdered * e.workRate);
    }
  }


  ngOnInit(): void {
    this.tableColumns = SubcontractorWorkOrderMetadata.subContractorWorkOrderDetails.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: SubcontractorWorkOrderMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: SubcontractorWorkOrderMetadata.subContractorWorkOrderDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData. subContractorWorkOrderDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    
    
    this.fetchWorkNameSelectOptions();
   
   
  }

  

 

  

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable< SubContractorWorkOrder > {
    let payload = {
      ...this.modalForms.issued.model,
      subContractorWorkOrderDetails : this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<SubContractorWorkOrder>(SubcontractorWorkOrderMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 1,
        userId: 1
      }
      payload = { ...payload, ...dummyDefaultFields }
      return this.dataHandler.post<SubContractorWorkOrder>(SubcontractorWorkOrderMetadata.serviceEndPoint, [payload]);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  onAddBtnClick() {
    if (this.modalForms.usage.form.valid) {
      this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
      // const dataRow:  SubContractorWorkOrderDetails = Object.assign({}, this.modalForms.usage.model);
      const dataRow: any = Object.assign({}, this.modalForms.usage.model);
      dataRow.labourWorkName = this.WorknameDataset.find(e => e.id === dataRow.workId).labourWorkName;
      dataRow['total'] = dataRow.quantityOrdered * dataRow.workRate;
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      this.modalForms.usage.form.reset();
    }
  }


  onSaveBtnClick() {
    if (this.modalForms.issued.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.modalForms.issued.model
        }
        this.dialogRef.close(closeEvent);
      });
    }
  }


 
onUpdateDetailBtnClick() {

}

onCancelUpdateBtnClick() {
  this.enableItemEdit = false;
  this.modalForms.usage.form.reset();
}
WorknameDataset: LabourWorkRate[];
private fetchWorkNameSelectOptions() {
  this.dataHandler.get<LabourWorkRate[]>(this.labourWorkrateSerivceUrl).subscribe((res: LabourWorkRate[]) => {
    if (res) {
      this.WorknameDataset=res;
              FormfieldHandler.worknameDropdown.templateOptions.options = res.map((e: LabourWorkRate) => (
                {
                 label: e.labourWorkName,
                 value: e.id
                }
            ));
      this.listenworknameChange();
    }
  });
}

listenworknameChange() {
  FormfieldHandler.worknameDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
    const selectedworkname: LabourWorkRate = this.WorknameDataset.find(e => e.id === this.modalForms.usage.model.workId)
    if (selectedworkname) {
      this.modalForms.usage.model.workRate= selectedworkname.rate;
      this.modalForms.usage.model = { ...this.modalForms.usage.model};
      console.log("",this.modalForms.usage.model['workRate']);
    }
  }
}

private get labourWorkrateSerivceUrl() {
  const user = this.authService.loggedInUser;
  const specid=2;
  return `${LabourWorkRateSettingMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}/${specid}`;
}

  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit:  SubContractorWorkOrderDetails) {
    this.enableStockEdit = true;
    this.modalForms.usage.model = rowToEdit;
  }

  onUpdateStockBtnClick() {

  }

  onCancelStockUpdateBtnClick() {

  }

  ngOnDestroy() {
    this.modalForms.issued.form.reset();
    this.modalForms.usage.form.reset();
    this.projectDivisionFieldsHandler.clear();
    if (this.isEdit) {
      this.stateService.clear(SubcontractorWorkOrderMetadata.moduleId);
    }
    this.subscribeProjectDivison.unsubscribe();
  }


}


