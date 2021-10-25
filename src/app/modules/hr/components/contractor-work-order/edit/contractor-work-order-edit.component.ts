import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ContractorWorkOrder, ContractorWorkOrderDetails } from '../definitions/contractor-work-order.definition';
import { ContractorWorkOrderMetadata } from '../contractor-work-order.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { Router } from '@angular/router';
//import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
//import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';

@Component({
  selector: 'app-contractor-work-order-edit',
  templateUrl: './contractor-work-order-edit.component.html',
  styleUrls: ['./contractor-work-order-edit.component.css']
})
export class ContractorWorkOrderEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  amount=0;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private dialogRef: MatDialogRef<ContractorWorkOrderEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ContractorWorkOrder,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private router: Router,
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
    this.tableColumns = ContractorWorkOrderMetadata.contractorWorkOrderDetails.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: ContractorWorkOrderMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: ContractorWorkOrderMetadata.contractorWorkOrderDetails.formFields
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
    if(this.modalForms.issued.model.blockId == null || this.modalForms.issued.model.unitId == null || this.modalForms.issued.model.floorId == null){
      this.modalForms.issued.model.blockId = 0;
      this.modalForms.issued.model.unitId = 0;
      this.modalForms.issued.model.floorId = 0;
    }
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

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<ContractorWorkOrder> {
    let payload = {
      ...this.modalForms.issued.model,
    contractorWorkOrderDetails: this.dataSource.data,
    financialYearId : 1,
    billAmount : this.amount,
    billAmountBalance :this.amount,
    negotiatedAmount :this.amount
    }
    if (this.isEdit) {
      return this.dataHandler.put<ContractorWorkOrder>(ContractorWorkOrderMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 1,
        userId: 1
      }
      payload = { ...payload, ...dummyDefaultFields }
      return this.dataHandler.post<ContractorWorkOrder>(ContractorWorkOrderMetadata.serviceEndPoint, [payload]);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }
  openApproveDialog(): void {
    const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.saveChanges();
        }
    });
}

get isEditedFromApproval() {
    return this.router.url.includes('approval');
}

onSaveBtnClick(nextLevel?: boolean) {
    if (this.modalForms.issued.form.valid) {
        if (this.isEditedFromApproval) {
            this.openApproveDialog();
        } else {
            if (nextLevel) {
                this.modalForms.issued.model.approvedDate = new Date();
                this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
                this.modalForms.issued.model.approvalLevel = 1;
            }
            else{
              this.modalForms.issued.model.approvalLevel = 0;
              this.modalForms.issued.model.approvalStatus =0;
              this.modalForms.issued.model.approvedDate = new Date();
            }
            this.saveChanges();
        }
      }
    }

    saveChanges() {
        this.httpRequest.subscribe((res) => {
            const closeEvent: IDialogEvent = {
                action: this.isEdit ? DialogActions.edit : DialogActions.add,
                data: res || this.modalForms.issued.model
            }
            this.dialogRef.close(closeEvent);
        })
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
      this.dataSource.data.forEach((row) => {
        this.amount = this.amount + row['totalamount'];
        // this.balanceAmount = this.balanceAmount + row['total'];
      });
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