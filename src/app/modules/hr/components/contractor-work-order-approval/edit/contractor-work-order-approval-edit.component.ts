import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ContractorWorkOrder, ContractorWorkOrderDetails } from '../definitions/contractor-work-order.definition';
import { ContractorWorkOrderApprovalMetadata } from '../contractor-work-order-approval.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { ContractorWorkOrderMetadata } from '../../contractor-work-order/contractor-work-order.configuration';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
//import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
//import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';

@Component({
  selector: 'app-contractor-work-order-approval-edit',
  templateUrl: './contractor-work-order-approval-edit.component.html',
  styleUrls: ['./contractor-work-order-approval-edit.component.css']
})
export class ContractorWorkOrderApprovalEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private dialogRef: MatDialogRef<ContractorWorkOrderApprovalEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ContractorWorkOrder,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private dialog: MatDialog,

  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.loadDropdowns();
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<ContractorWorkOrder> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.issued.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }

  ngOnInit(): void {
    this.tableColumns = ContractorWorkOrderApprovalMetadata.contractorWorkOrderDetails.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: ContractorWorkOrderApprovalMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: ContractorWorkOrderApprovalMetadata.contractorWorkOrderDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.loadItemDetails();
    this.dataSource = new MatTableDataSource(this.editData.contractorWorkOrderDetails || []);
  }
  loadItemDetails() {
    if (this.isEdit) {
        const endpoint = `${ContractorWorkOrderMetadata.serviceEndPoint}List/${this.editData.id}`;
        this.dataHandler.get(endpoint).subscribe((res: any[]) => {
          res.forEach(e => {
            e['amount'] = e.qty * e.rate;
            e['totalamount'] = e['amount'] + (e['amount'] * e.tax) /100;
          })
            this.dataSource = new MatTableDataSource(res)
        });
    } else {
        this.dataSource = new MatTableDataSource([]);
    }
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchWorkCategorySelectOptions();
    this.fetchContractorSelectOptions();
    //this.fetchMaterial();
    this.bindProjectDivisionFields();
  }

  // onSaveBtnClick() {
  //   if (this.modalForms.issued.form.valid) {
  //     this.httpRequest.subscribe((res) => {
  //       const closeEvent: IDialogEvent = {
  //         action: this.isEdit ? DialogActions.edit : DialogActions.add,
  //         data: this.modalForms.issued.model
  //       }
  //       this.dialogRef.close(closeEvent);
  //     });
  //   }
  // }
  get approvalServiceUrl() {
    let user = this.authService.loggedInUser;
    
    return `${this.modalForms.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    // if (this.modalForms.issued.model.maxlevel === this.modalForms.issued.model.approvalLevel) {
    //  this.modalForms.issued.model.approvalStatus = 1;
    //  console.log("max",this.modalForms.issued.model.maxlevel);
    //  console.log("level",this.modalForms.issued.model.approvalLevel);
    //  console.log("sta",this.modalForms.issued.model.approvalStatus);
    //   //const message = 'WARNING : Please select a payment';
    //  // this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
    //  // return;
    // }
    // else{
    //   this.modalForms.issued.model.approvalStatus =  this.modalForms.issued.model.approvalStatus + 1;
    // }
    const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveChanges(isApproved);
      }
    });
  }



  saveChanges(isApproved: boolean) {
    if (isApproved) {
      // this.selectedbill.approvalLevel++;
      console.log("sta",this.modalForms.issued.model.approvalStatus);

      if (this.modalForms.issued.model.maxlevel === this.modalForms.issued.model.approvalLevel) {
        this.modalForms.issued.model.approvalStatus = 1;
        console.log("max",this.modalForms.issued.model.maxlevel);
        console.log("level",this.modalForms.issued.model.approvalLevel);
        console.log("sta",this.modalForms.issued.model.approvalStatus);
        this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
        this.modalForms.issued.model.approvedDate = new Date();
         //const message = 'WARNING : Please select a payment';
        // this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
        // return;
       }
       else{
         this.modalForms.issued.model.approvalLevel =  this.modalForms.issued.model.approvalLevel + 1;
       }
  
    } 
    // else {
    //   this.selectedbill.approvalLevel--;
    // }
    // this.selectedbill.indentDetails = this.itemDatasource.data;
    else{
      this.modalForms.issued.model.approvalLevel =  this.modalForms.issued.model.approvalLevel - 1;

    }
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    let payload: any = this.modalForms.issued.model
    payload.contractorWorkOrderDetails = this.dataSource.data;
    // payload.balanceAmount = this.balanceAmount;
    // payload.amount = this.amount;
        return this.dataHandler.put<ContractorWorkOrder>(ContractorWorkOrderMetadata.serviceEndPoint, [payload]).subscribe((res) => {
    // this.dataHandler.put<ForemanWorkBill>("BuildExeHR/api/ForemanWorkBill", [this.selectedbill]).subscribe((res) => {
      this.snackBar.open(` ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      // const rowToRemove = this.dataSource1.data.findIndex(e => e.id === this.selectedbill.id);
      // if (rowToRemove !== -1) {
      //   this.dataSource1.data.splice(rowToRemove, 1);
      //   // this.dataSource1._updateChangeSubscription();
      //   // this.itemDatasource.data = [];
      //   // this.itemDatasource._updateChangeSubscription();
      // }
  this.dialogRef.close();

    })
  }
  onApproveBtnClick() {
    const isApproved = true;
    this.openApproveRemarkDialog(isApproved);
  }

  onRejectBtnClick() {
    const isApproved = false;
    this.openApproveRemarkDialog(isApproved);
  }
  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<ContractorWorkOrder> {
    let payload = {
      ...this.modalForms.issued.model,
    contractorWorkOrderDetails: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<ContractorWorkOrder>(ContractorWorkOrderApprovalMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 1,
        userId: 1
      }
      payload = { ...payload, ...dummyDefaultFields }
      return this.dataHandler.post<ContractorWorkOrder>(ContractorWorkOrderApprovalMetadata.serviceEndPoint, [payload]);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  onAddStockBtnClick() {
    if (this.isValid) {
      this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
      const dataRow: ContractorWorkOrderDetails = Object.assign({}, this.modalForms.usage.model);
      dataRow['amount'] = dataRow.qty * dataRow.rate;
      dataRow['totalamount'] = dataRow['amount'] + (dataRow['amount'] * dataRow.tax) / 100;
      this.dataSource.data.push(dataRow);
      this.dataSource._updateChangeSubscription();
      this.modalForms.usage.form.reset();
    }
  }
  get isValid() {
    if (!this.modalForms.usage.model['hsnCode']) {
      this.snackBar.open('Warning : Please select hsncode', null, { panelClass: 'snackbar-error-message' });
      return false;
    }
    if (!this.modalForms.usage.model['workName']) {
      this.snackBar.open('Warning : Please input Work Name', null, { panelClass: 'snackbar-error-message' });
      return false;
    }
    return true;
  }


  private fetchWorkCategorySelectOptions() {
    this.dataHandler.get<BasicWorkCategory[]>(this.workCategoryServiceUrl)
      .subscribe((res: BasicWorkCategory[]) => {
        if (res) {
          FormfieldHandler.categoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
            {
              label: e.workCategoryName,
              value: e.id
            }
          ));
        }
      });
  }

  get workCategoryServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${BasicWorkCategoryMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  private fetchContractorSelectOptions() {
    this.employeeService.getContractor().subscribe((res) => {
      if (res) {
        FormfieldHandler.contractorDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.id
          }
        ));
      }
    });
  }

  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: ContractorWorkOrderDetails) {
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
  }

}