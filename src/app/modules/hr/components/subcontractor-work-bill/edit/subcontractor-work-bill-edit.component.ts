import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';
import { ProjectMetadata } from 'src/app/modules/crm/components/project/project.configuration';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { SubcontractorBill, SubcontractorBillDetails, SubContractorPreviousSubBill } from 'src/app/modules/hr/components/subcontractor-work-bill/definitions/subcontractor-work-bill.definition';
import { SubcontractorBillMetadata } from 'src/app/modules/hr/components/subcontractor-work-bill/subcontractor-work-bill.configuration';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../../subcontractor-work-bill/handlers/form-field.handler';
import { SubContractorWorkOrder, SubContractorWorkOrderDetails } from '../../subcontractor-work-order/definitions/subcontractor-work-order.definition';
import { SubcontractorWorkOrderMetadata } from '../../subcontractor-work-order/subcontractor-work-order.configuration';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { AdditionalBillComponent } from 'src/app/modules/hr/components/subcontractor-work-bill/edit/additional-bill/additional-bill.component';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { Router } from '@angular/router';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';

@Component({
  selector: 'app-subcontractor-work-bill-edit',
  templateUrl: './subcontractor-work-bill-edit.component.html',
  styleUrls: ['./subcontractor-work-bill-edit.component.css']
})
export class SubcontractorWorkBillEditComponent implements OnInit {

  module;
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  model: SubcontractorBill;
  selection = new SelectionModel<SubContractorWorkOrder>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  BillnoDataset: any;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<SubcontractorWorkBillEditComponent>,
    private dialogEventHandler: DialogEventHandlerService,
    @Inject(MAT_DIALOG_DATA) private editData: SubcontractorBill,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private employeeService: EmployeeService
  ) {


    this.module = SubcontractorBillMetadata;
    this.tableColumns = this.module.subcontractorBillDetails.tableColumns;
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.model = this.editData;
    this.defineModalForms();
    this.loadDropdowns();
    this.bindFormSelectOptions();
  }


  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<SubcontractorBillDetails> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.issued.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);

  }

  
  bindFormSelectOptions() {
    this.fetchSubcontractorSelectOptions();
    this.bindProjectDivisionFields();
    if(this.modalForms.issued.model.blockId == null || this.modalForms.issued.model.unitId == null || this.modalForms.issued.model.floorId == null){
      this.modalForms.issued.model.blockId = 0;
      this.modalForms.issued.model.unitId = 0;
      this.modalForms.issued.model.floorId = 0;
    }
    FormfieldHandler.projectDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      // this.modalForms.issued.form.reset();
      this.fetchWorkOrderSelectOptions();
    }
    FormfieldHandler.subcontractorDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchWorkOrderSelectOptions();
      
    }
    FormfieldHandler.workorderDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchWorkBillnoSelectOptions();
    //  this.PreviousSubBillSelectOptions() 
   
    }
  }

  loadItemDetails() {
    if (this.isEdit) {
        const endpoint = `${SubcontractorWorkOrderMetadata.serviceEndPoint}List/${this.editData.id}`;
        this.dataHandler.get(endpoint).subscribe((res: any[]) => {
            this.dataSource = new MatTableDataSource(res)
        });
    } else {
        this.dataSource = new MatTableDataSource([]);
    }
}



  // fetchWorkOrderSelectOptions() {
  //   // const user = this.authService.loggedInUser;
  //   const dummyprojectId = 1008; const dummyUnitId = 0; const dummyBlockId = 5; const dummyFloorId = 1; 
  //   this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
  //   const quueryData = {...this.model} as any;
  //   const endPoint = `${SubcontractorWorkOrderMetadata.serviceEndPoint}/${dummyprojectId}/${dummyUnitId}/${dummyBlockId}/${dummyFloorId}/${quueryData.subContractorId}`;
  //   this.dataHandler.get<any[]>(endPoint)
  //     .subscribe((res: any[]) => {
  //       if (res) {
  //         FormfieldHandler.workorderDropdown.templateOptions.options = res.map((e: any) => (
  //           {
  //             label: e.workOrderNo,
  //             value: e.id
  //           }
  //         ));
  //       }
  //     });
  // }

  fetchWorkOrderSelectOptions() {
    const user = this.authService.loggedInUser;
    // const dummyprojectId = 1008; const dummyUnitId = 0; const dummyBlockId = 5; const dummyFloorId = 1; 
    // const dummyforemanId = 13;
    const subContractorId = this.modalForms.issued.model.subContractorId;
    const projectId = this.modalForms.issued.model.projectId;
    const blockId = this.modalForms.issued.model.blockId;
    const unitId = this.modalForms.issued.model.unitId;
    const floorId = this.modalForms.issued.model.floorId;
    const endPoint = `${SubcontractorBillMetadata.dropdownEndpoints.workno}/${projectId}/${unitId}/${blockId}/${floorId}/${subContractorId}`;
    this.dataHandler.get<any[]>(endPoint)
      .subscribe((res: any[]) => {
        if (res) {
        // this.WorknoDataset=res;
          FormfieldHandler.workorderDropdown.templateOptions.options = res.map((e: any) => (
            {
              label: e.workOrderNo,
              value: e.id
            }
          ));
        }
      //  this.fetchWorkBillnoSelectOptions();
      });
  }


  // fetchWorkOrderSelectOptions() {

  //   this.dataHandler.get<any[]>(this.workorderServiceUrl)
  //       .subscribe((res: any[]) => {
  //         if (res) {
  //           FormfieldHandler.workorderDropdown.templateOptions.options = res.map((e: any) => (
  //             {
  //               label: e.workOrderNo,
  //               value: e.id
  //             }
  //           ));
  //           }
  //       });
  // }

  // get workorderServiceUrl() {
  //   const user = this.authService.loggedInUser;
  //   const dummyprojectId = 1008;
  //   return `${SubcontractorWorkOrderMetadata.serviceEndPoint}/${dummyprojectId}/${user.companyId}/${user.branchId}`;
  // }


  ngOnInit() {
  //  this.onPrepareBtnClick();
  }

  onPrepareBtnClick() {
    // if (this.modalForms.issued.valid) {
      const dummyCompanyId = 1; const dummyBranchId = 2;
      console.log("",this.modalForms.issued.model.workOrderId);
      // this.PreviousSubBillSelectOptions();
      this.dataHandler.get<SubContractorWorkOrder[]>(`${SubcontractorWorkOrderMetadata.serviceEndPoint}List/${this.modalForms.issued.model.workOrderId}`)
        .subscribe((res: SubContractorWorkOrder[]) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
         
        });
    // }
  }



  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: SubcontractorBillMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: SubcontractorBillMetadata.subcontractorBillDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.loadItemDetails();
    this.dataSource = new MatTableDataSource(this.editData.subcontractorBillDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    // this.fetchSubcontractorSelectOptions();
    // this.bindProjectDivisionFields();
    // this.fetchWorkOrderSelectOptions();
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
           
            if(this.modalForms.issued.model.maxlevel===0)
            {
                this.modalForms.issued.model.approvalStatus=1;
                this.modalForms.issued.model.approvedDate = new Date();
                this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
                this.modalForms.issued.model.approvalLevel = 1;
            }
            else
            {
              this.modalForms.issued.model.approvalLevel=1;
              this.modalForms.issued.model.approvedDate = new Date();
              this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
                this.saveChanges(); 
            }
          
            }
          
        }
    }
  }


  saveChanges() {
    // this.httpRequest.subscribe((res) => {
    //     const closeEvent: IDialogEvent = {
    //         action: this.isEdit ? DialogActions.edit : DialogActions.add,
    //         data: res || this.modalForm.indent.model
    //     }
    //     this.dialogRef.close(closeEvent);
    this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.modalForms.issued.model
        }
        this.dialogRef.close(closeEvent);
    })
}

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  // get httpRequest(): Observable<SubcontractorBill > {
  //   let payload = {
  //     ...this.modalForms.issued.model,
  //     materialUsageDetails: this.dataSource.data,
  //   }
  //   if (this.isEdit) {
  //     return this.dataHandler.put<SubcontractorBill>( SubcontractorBillMetadata .serviceEndPoint, [payload]);
  //   } else {
  //     const dummyDefaultFields = {
  //       companyId: 1,
  //       branchId: 1,
  //       userId: 1
  //     }
  //     payload = { ...payload, ...dummyDefaultFields }
  //     return this.dataHandler.post<SubcontractorBill >( SubcontractorBillMetadata .serviceEndPoint, [payload]);
  //   }
  // }


  get httpRequest(): Observable<SubcontractorBill> {
    let payload: any = this.modalForms.issued.model
    payload.subContractorWorkOrderDetails = this.dataSource.data;
    if (this.isEdit) {
      return this.dataHandler.put<SubcontractorBill>(SubcontractorBillMetadata.serviceEndPoint, [payload]);
    } else {
      payload.isDeleted = 0;
      return this.dataHandler.post<SubcontractorBill>(SubcontractorBillMetadata.serviceEndPoint, [payload]);
    }
  }


  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      const columns = this.tableColumns.map(col => col.field);
      return columns;
    } else {
      return [];
    }
  }

  onUserInput($event, row, column) {
    row[column] = $event.target.value;
    row['category'] = row.currentQuantity * row.workRate;
    row['negotiatedAmount']=row.currentQuantity * row.workRate;
    this.modalForms.issued.model['netAmount']=row['category'];
    // this.calculateItemDetailsTableTotal();
  }


  onAdditionalbillBtnClick(rowToEdit?: SubContractorWorkOrder) {
    this.dialogEventHandler.openDialog(
      AdditionalBillComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }
  private affectedRowIndex(affectedRow?: SubContractorWorkOrder) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: SubContractorWorkOrder) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  isAllSelected() {
    const totalSelected = this.selection.selected.length;
    const totalRows = this.dataSource.data.length;
    return totalSelected === totalRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  private fetchSubcontractorSelectOptions() {
    this.employeeService.getSubContractor().subscribe((res) => {
      if (res) {
        FormfieldHandler.subcontractorDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.id
          }
        ));
      }
    //  this.fetchWorkOrderSelectOptions()
    });
  }

  fetchWorkBillnoSelectOptions() {
    const user = this.authService.loggedInUser;
    const dummytype = 1; 
    console.log("wid",this.modalForms.issued.model.workOrderId);
    const endPoint = `${'BuildExeHR/api/MaxNo'}/${dummytype}/${this.modalForms.issued.model.workOrderId}/${1}`;
    this.dataHandler.get<any[]>(endPoint)
      .subscribe((res: any[]) => {
        if (res) {
          this.modalForms.issued.model['billno']=String(res);
          console.log("bill",this.modalForms.issued.model.billno);
          this.modalForms.issued.model = { ...this.modalForms.issued.model};
        }
      });
    }


  //    PreviousSubBillSelectOptions() {
  //       const user = this.authService.loggedInUser;
  //       const dummytype = 1; 
  //       const endPoint = `${'BuildExeHR/api/SubContractorPreviousSubBill'}/${this.modalForms.issued.model.workOrderId}/${this.modalForms.issued.model.billno}`;
  //       this.dataHandler.get<any[]>(endPoint)
  //         .subscribe((res: any[]) => {
  //           if (res) {
  //             const dataRow: any = Object.assign({}, this.modalForms.issued.model);
  //             dataRow['previousBillQty'] = res[0].previousBillQty;
  //           }
  //         });  
  // }


  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: SubcontractorBillDetails) {
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