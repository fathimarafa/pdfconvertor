import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { SubContractorWorkOrder, SubContractorWorkOrderDetails } from 'src/app/modules/hr/components/subcontractor-work-order/definitions/subcontractor-work-order.definition';
import { SubcontractorWorkOrderMetadata } from 'src/app/modules/hr/components/subcontractor-work-order/subcontractor-work-order.configuration';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmModalComponent } from 'src/app/modules/common/confirm-modal/confirm-modal.component';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from 'src/app/modules/hr/components/subcontractor-work-order/handlers/form-field.handler';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { Indent } from '../../subcontractor-indent/definition/subcontractor-indent.definition';
import { SubcontractorIndentMetadata } from '../../subcontractor-indent/subcontractor-indent.configuration';
import { SelectIndentComponent } from 'src/app/modules/hr/components/subcontractor-work-order/edit/select-indent/select-indent.component';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimationQueryMetadata } from '@angular/animations';
import { LabourWorkRateSettingMetadata } from '../../labour-workrate-setting/labour-workrate-setting.configuration';
import { LabourWorkRate } from '../../labour-workrate-setting/definitions/labour-workrate-setting.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';

@Component({
  selector: 'app-subcontractor-work-order-edit',
  templateUrl: './subcontractor-work-order-edit.component.html',
  styleUrls: ['./subcontractor-work-order-edit.component.css']
})
export class SubcontractorWorkOrderEditComponent implements OnInit {
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  enableItemEdit: boolean;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  model: SubContractorWorkOrder;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  indentList: Indent[];

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
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private employeeService: EmployeeService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;

    }
    // this.calculateOrderTotal();
    this.defineModalForms();
    this.loadDropdowns();
    this.bindFormSelectOptions();
    // this.fetchSubcontractorIndent();
  }

  calculateOrderTotal() {
    if (this.isEdit) {
      this.editData.subContractorWorkOrderDetails.forEach((e: SubContractorWorkOrderDetails) => e['total'] = e.quantityOrdered * e.workRate);
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

  // bindProjectDivisionFields() {
  //   const projectControllerFields: ProjectDivisionFields<SubContractorWorkOrderDetails> = {
  //     projectDropdown: FormfieldHandler.projectDropdown,
  //     blockDropdown: FormfieldHandler.blockDropdown,
  //     floorDropdown: FormfieldHandler.floorDropdown,
  //     unitDropdown: FormfieldHandler.unitDropdown,
  //     model: this.modalForms.issued.model,
  //     isEdit: this.isEdit
  //   };
  //   this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  //   this.fetchSubcontractorSelectOptions();
  // }


  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<SubContractorWorkOrderDetails> = {
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
      this.fetchSubcontractorIndent();
    }
    FormfieldHandler.subcontractorDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchSubcontractorIndent();
      
    }
    // FormfieldHandler.workorderDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
    //   this.fetchWorkBillnoSelectOptions();
    // //  this.PreviousSubBillSelectOptions() 
   
    
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
    this.loadItemDetails();
    this.dataSource = new MatTableDataSource(this.editData.subContractorWorkOrderDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchWorkCategorySelectOptions();
    this.fetchWorkNameSelectOptions();
    // this.bindProjectDivisionFields();
    // this.fetchWorkOrderSelectOptions();
  }

  fetchSubcontractorIndent() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<Indent[]>(`${'BuildExeHR/api/Indent'}/${this.modalForms.issued.model.projectId}/${this.modalForms.issued.model.unitId}/${this.modalForms.issued.model.blockId}/${this.modalForms.issued.model.floorId}/${this.modalForms.issued.model.subContractorId}`)
      .subscribe((res: Indent[]) => {
        this.indentList = res;
      });
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  // get httpRequest(): Observable< SubContractorWorkOrder > {
  //   let payload = {
  //     ...this.modalForms.issued.model,
  //     subContractorWorkOrderDetails : this.dataSource.data,
  //   }
  //   if (this.isEdit) {
  //     return this.dataHandler.put<SubContractorWorkOrder>(SubcontractorWorkOrderMetadata.serviceEndPoint, [payload]);
  //   } else {
  //     const dummyDefaultFields = {
  //       companyId: 1,
  //       branchId: 1,
  //       userId: 1
  //     }
  //     payload = { ...payload, ...dummyDefaultFields }
  //     return this.dataHandler.post<SubContractorWorkOrder>(SubcontractorWorkOrderMetadata.serviceEndPoint, [payload]);
  //   }
  // }

  get httpRequest(): Observable<SubContractorWorkOrder> {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    let payload: any = this.modalForms.issued.model
    payload.subContractorWorkOrderDetails = this.dataSource.data;
    if (this.isEdit) {
      return this.dataHandler.put<SubContractorWorkOrder>(SubcontractorWorkOrderMetadata.serviceEndPoint, [payload]);
    } else {
      payload.isDeleted = 0;
      return this.dataHandler.post<SubContractorWorkOrder>(SubcontractorWorkOrderMetadata.serviceEndPoint, [payload]);
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
         
          if(this.modalForms.issued.model.maxlevel===0)
          {
              this.modalForms.issued.model.approvalStatus=1;
              this.modalForms.issued.model.approvedDate = new Date();
              this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
              this.modalForms.issued.model.approvalLevel = 1;
              this.saveChanges(); 
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


  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  onAddItemBtnClick() {
    if (this.modalForms.usage.form.valid) {
      const dataRow: any = Object.assign({}, this.modalForms.usage.model);
      dataRow.labourWorkName = this.WorknameDataset.find(e => e.id === dataRow.workId).labourWorkName;
      dataRow['total'] = dataRow.quantityOrdered * dataRow.workRate;
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      this.modalForms.usage.form.reset();
    
    }
  }

  // onSaveBtnClick() {
  //   if (this.modalForms.issued.form.valid) {
  //     this.httpRequest.subscribe((res) => {
  //       const closeEvent: IDialogEvent = {
  //         action: this.isEdit ? DialogActions.edit : DialogActions.add,
  //         data: res || this.modalForms.issued.model
  //       }
  //       this.dialogRef.close(closeEvent);
  //     })

  //   }
  // }

  onSelectSubcontractorIndentBtnClick() {
    const indentList: Indent[] = this.indentBySelectedProject;
    // if (indentList.length) {
      const dialogReference = this.dialog.open(SelectIndentComponent, { data: this.indentList });
      dialogReference.afterClosed().subscribe((result: Indent[]) => {
        if (result) {
          const indent = result.map((e: Indent) => {
            return {
              labourWorkName: e.labourWorkName,
              indentId: e.id,
              remarks: e.remarks,
              quantityOrdered: e.quantityOrdered
            }
          });
          this.dataSource.data = this.dataSource.data.concat(indent);
        }
      });
    // } else {
    //   const errorMessage = 'No matching records found , please clear filter fields and try again';
    //   this.snackBar.open(errorMessage, null, { panelClass: 'snackbar-error-message' });
    // }
  }

  // onUpdateDetailBtnClick() {

  // }

  // onCancelUpdateBtnClick() {
  //   this.enableItemEdit = true;
  //   this.modalForms.usage.form.reset();
  // }

  onUpdateDetailBtnClick(rowToEdit: SubContractorWorkOrderDetails) {
    this.onEditBtnClick(rowToEdit);
    this.dataSource._updateChangeSubscription();
    this.enableItemEdit=false;
}

onCancelUpdateBtnClick() {

  this.enableItemEdit = false;
  this.dataSource._updateChangeSubscription();
  this.modalForms.usage.form.reset();
}


  get indentBySelectedProject() {
    if (this.modalForms.issued.model.projectId) {
      return this.indentList.filter((e) => e.projectId === this.modalForms.issued.model.projectId);
    } else {
      return this.indentList;
    }
  }

  fetchWorkCategorySelectOptions() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    const endPoint = `${BasicWorkCategoryMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`;
    this.dataHandler.get<BasicWorkCategory[]>(endPoint)
      .subscribe((res: BasicWorkCategory[]) => {
        if (res) {
          FormfieldHandler.workcategoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
            {
              label: e.workCategoryName,
              value: e.id
            }
          ));
        }
      });
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


  // fetchWorkOrderSelectOptions() {
  //   const user = this.authService.loggedInUser;
  //   const dummyprojectId = 1008; const dummyUnitId = 0; const dummyBlockId = 5; const dummyFloorId = 1; const dummySubContractorId = 12;
  //   const endPoint = `${SubcontractorWorkOrderMetadata.serviceEndPoint}/${dummyprojectId}/${dummyUnitId}/${dummyBlockId}/${dummyFloorId}/${dummySubContractorId}`;
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
    });
  }

  
  // removeStock(rowIndex: number) {
  //   this.dataSource.data.splice(rowIndex, 1)
  //   this.dataSource._updateChangeSubscription();
  // }

  // editStock(rowToEdit: SubContractorWorkOrderDetails) {
  //   this.enableStockEdit = true;
  //   this.modalForms.usage.model = rowToEdit;
  // }

  removeItem(rowIndex: number) {
   
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  onEditBtnClick(rowToEdit: SubContractorWorkOrderDetails) {
    this.enableItemEdit = true;
    // this.modalForm.itemDetails.model  = Object.assign({}, rowToEdit);
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


