import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, Subscription } from "rxjs";
import { DialogActions, IDialogEvent } from "src/app/definitions/dialog.definitions";
import { FormfieldHandler} from "src/app/modules/hr/components/subcontractor-indent/handlers/form-field.handler";
import {  } from "src/app/modules/hr/components/subcontractor-indent/handlers/form-field.handler";
import { DataHandlerService } from "src/app/services/datahandler/datahandler.service";
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from "src/app/services/project-division-fields-handler/project-division-fields-handler.service";
import { Indent, IndentDetails, IndentForm } from "../definition/subcontractor-indent.definition";
import { SubcontractorIndentMetadata } from "../subcontractor-indent.configuration";
import { FormGroup } from "@angular/forms";
import { LabourWorkRateSettingMetadata } from "../../labour-workrate-setting/labour-workrate-setting.configuration";
import { LabourWorkRate } from "../../labour-workrate-setting/definitions/labour-workrate-setting.definition";
import { AuthenticationService } from "src/app/services/auth-service/authentication.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { FormApprovalDialogComponent } from "src/app/modules/common/form-approval-dialog/form-approval-dialog.component";
import { EmployeeService } from "src/app/services/employee-service/employee.service";

@Component({
    selector: 'app-subcontractor-indent-edit',
    templateUrl: './subcontractor-indent-edit.component.html',
    styleUrls: ['./subcontractor-indent-edit.component.css']
})
export class SubcontractorIndentEditComponent implements OnInit {

    
  //   modalForms;
  //   isEdit: boolean;
  //   tableColumns;
  //   dataSource;
  //   subscribeProjectDivison: Subscription;
  //   enableStockEdit: boolean;
  //   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  //   constructor(
  //     private dialogRef: MatDialogRef<SubcontractorIndentEditComponent>,
  //     @Inject(MAT_DIALOG_DATA) private editData: Indent,
  //     private dataHandler: DataHandlerService,
  //     private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  //   ) {
  //     if (Object.keys(this.editData).length) {
  //       this.isEdit = true;
  //     }
  //     this.defineModalForms();
  //     this.loadDropdowns();
  //   }
  
  //   bindProjectDivisionFields() {
  //     const projectControllerFields: ProjectDivisionFields<IndentDetails> = {
  //       projectDropdown: FormfieldHandler.projectDropdown,
  //       blockDropdown: FormfieldHandler.blockDropdown,
  //       floorDropdown: FormfieldHandler.floorDropdown,
  //       unitDropdown: FormfieldHandler.unitDropdown,
  //       model: this.modalForms.issued.model,
  //       isEdit: this.isEdit
  //     };
  //     // this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  //     // this.subscribeProjectDivison = this.projectDivisionFieldsHandler.listenProjectDivisionChange
  //     //   .subscribe((res: number) => {
  //     //     this.showHideProjectDivisionBasedFields(res);
  //       // })
  //   }
  
  
  //   ngOnInit(): void {
  //     this.tableColumns = SubcontractorIndentMetadata .indentDetails.tableColumns;
  //   }
  
  //   defineModalForms() {
  //     this.modalForms = {
  //       issued: {
  //         form: new FormGroup({}),
  //         model: this.editData,
  //         options: {},
  //         fields: SubcontractorIndentMetadata.formFields
  //       },
  //       usage: {
  //         form: new FormGroup({}),
  //         model: {},
  //         options: {},
  //         fields: SubcontractorIndentMetadata.indentDetails.formFields
  //       }
  //     }
  //     const formFields: ModalFormFields = {
  //       issued: this.modalForms.issued.fields,
  //       usage: this.modalForms.usage.fields
  //     }
  //     FormfieldHandler.initialize(formFields);
  //     this.loadDropdowns();
  //     this.dataSource = new MatTableDataSource(this.editData.indentDetails || []);
  //   }
  
  //   ngAfterViewInit() {
  //     this.dataSource.paginator = this.paginator;
  //   }
  
  //   loadDropdowns() {
       
  //     this. fetchSubcontractorSelectOptions();
  //     this. fetchWorkNameSelectOptions() ;
  //     this.bindProjectDivisionFields();
  //   }
  
  //   onSaveBtnClick() {
  //     if (this.modalForms.issued.form.valid) {
  //       this.httpRequest.subscribe((res) => {
  //         const closeEvent: IDialogEvent = {
  //           action: this.isEdit ? DialogActions.edit : DialogActions.add,
  //           data: this.modalForms.issued.model
  //         }
  //         this.dialogRef.close(closeEvent);
  //       });
  //     }
  //   }
  
  //   onCancelBtnClick() {
  //     this.dialogRef.close();
  //   }
  
  //   get httpRequest(): Observable<Indent> {
  //     let payload = {
  //       ...this.modalForms.issued.model,
  //       materialUsageDetails: this.dataSource.data,
  //     }
  //     if (this.isEdit) {
  //       return this.dataHandler.put<Indent>(SubcontractorIndentMetadata.serviceEndPoint, [payload]);
  //     } else {
  //       const dummyDefaultFields = {
  //         companyId: 1,
  //         branchId: 1,
  //         userId: 1
  //       }
  //       payload = { ...payload, ...dummyDefaultFields }
  //       return this.dataHandler.post<Indent>(SubcontractorIndentMetadata.serviceEndPoint, [payload]);
  //     }
  //   }
    
  
  //   get dataColumns() {
  //     if (this.tableColumns && this.tableColumns.length) {
  //       return this.tableColumns.map(col => col.field);
  //     } else {
  //       return [];
  //     }
  //   }
  
  //   onAddBtnClick() {
  //     if (this.modalForms.usage.form.valid) {
  //       this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
  //       const dataRow: IndentDetails = Object.assign({}, this.modalForms.usage.model);
  //       this.dataSource.data.push(Object.assign({}, dataRow));
  //       this.dataSource._updateChangeSubscription();
  //       this.modalForms.usage.form.reset();
        
  //     }
  //   }
  
  //   showHideProjectDivisionBasedFields(projectDivision: number) {
  //     switch (projectDivision) {
  //       case 1:
  //         FormfieldHandler.unitFieldRow.hideExpression = true;
  //         FormfieldHandler.blockFloorRow.hideExpression = true;
  //         break;
  //       case 2:
  //         FormfieldHandler.unitFieldRow.hideExpression = false;
  //         FormfieldHandler.blockFloorRow.hideExpression = true;
  //         break;
  //       case 3:
  //         FormfieldHandler.unitFieldRow.hideExpression = false;
  //         FormfieldHandler.blockFloorRow.hideExpression = false;
  //         break;
  //       case 4:
  //         FormfieldHandler.unitFieldRow.hideExpression = true;
  //         FormfieldHandler.blockFloorRow.hideExpression = false;
  //         break;
  //     }
  //   }
  
   
   
  // fetchSubcontractorSelectOptions() {
  //   const dummyCompanyId = 1; const dummyBranchId = 0; const dummycategoryId = 4;
  //   const endPoint = `${EmployeelistMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}/${dummycategoryId}`;
  //   this.dataHandler.get<EmployeeList[]>(endPoint)
  //     .subscribe((res: EmployeeList[]) => {
  //       if (res) {
  //         FormfieldHandler.subcontractorDropdown.templateOptions.options = res.map((e: EmployeeList) => (
  //           {
  //             label: e.fullName,
  //             value: e['id']
  //           }
  //         ));
  //       }
  //     });
  // }
  

  //     fetchWorkNameSelectOptions() {
  //       const dummyCompanyId = 1; const dummyBranchId = 0;
  //       const endPoint = `${LabourWorkRateSettingMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`;
  //       this.dataHandler.get<LabourWorkRate []>(endPoint)
  //         .subscribe((res: LabourWorkRate []) => {
  //           if (res) {
  //             FormfieldHandler.worknameDropdown.templateOptions.options = res.map((e: LabourWorkRate ) => (
  //               {
  //                 label: e.labourWorkName,
  //                 value: e.id
  //               }
  //             ));
  //           }
  //         });
  //     }
  

  //   removeStock(rowIndex: number) {
  //     this.dataSource.data.splice(rowIndex, 1)
  //     this.dataSource._updateChangeSubscription();
  //   }
  
  //   editStock(rowToEdit: IndentDetails) {
  //     this.enableStockEdit = true;
  //     this.modalForms.issued.model = rowToEdit;
  //   }

   
  
  //   onUpdateStockBtnClick() {
  
  //   }
  
  //   onCancelStockUpdateBtnClick() {
  
  //   }
  
  //   ngOnDestroy() {
  //     this.modalForms.issued.form.reset();
  //     this.modalForms.usage.form.reset();
  //     this.projectDivisionFieldsHandler.clear();
  //     this.subscribeProjectDivison.unsubscribe();
  //   }
  
  // }

  
isEdit: boolean;
tableColumns = SubcontractorIndentMetadata.indentDetails.tableColumns;
dataSource;
modalForm: IndentForm;


constructor(
    private dialogRef: MatDialogRef<SubcontractorIndentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: Indent,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private employeeService: EmployeeService
) {
    if (Object.keys(this.editData).length) {
        this.isEdit = true;
    }
    this.defineForm();
    FormfieldHandler.initialize(this.modalForm);
    this.loadDropdowns();
}

defineForm() {
    this.modalForm = {
        indent: {
            form: new FormGroup({}),
            model: this.editData,
            options: {},
            fields: SubcontractorIndentMetadata.formFields
        },
        itemDetails: {
            form: new FormGroup({}),
            model: this.editData,
            options: {},
            fields: SubcontractorIndentMetadata.indentDetails.formFields
        }
    }
    this.modalForm.indent.model.indentTypeId = 2;
    this.loadItemDetails()
}

loadItemDetails() {
    if (this.isEdit) {
        const endpoint = `${SubcontractorIndentMetadata.serviceEndPoint}List/${this.editData.id}`;
        this.dataHandler.get(endpoint).subscribe((res: any[]) => {
            this.dataSource = new MatTableDataSource(res)
        });
    } else {
        this.dataSource = new MatTableDataSource([]);
    }
}

get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
        return this.tableColumns.map(col => col.field);
    } else {
        return [];
    }
}

loadDropdowns() {
  this.fetchSubcontractorSelectOptions();
    this.fetchWorkNameSelectOptions() ;
    this.bindProjectDivisionFields();
}

bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<Indent> = {
        projectDropdown: FormfieldHandler.projectDropdown,
        blockDropdown: FormfieldHandler.blockDropdown,
        floorDropdown: FormfieldHandler.floorDropdown,
        unitDropdown: FormfieldHandler.unitDropdown,
        model: this.modalForm.indent.model,
        isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
}

ngOnInit(): void { }

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
    if (this.modalForm.indent.form.valid) {
        if (this.isEditedFromApproval) {
            this.openApproveDialog();
        } else {
            if (nextLevel) {
                this.modalForm.indent.model.approvedDate = new Date();
                this.modalForm.indent.model.approvedBy = this.authService.loggedInUser.userId;
                this.modalForm.indent.model.approvalLevel = 1;
            }
            this.saveChanges();
        }
    }
}

saveChanges() {
    this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
            action: this.isEdit ? DialogActions.edit : DialogActions.add,
            data: res || this.modalForm.indent.model
        }
        this.dialogRef.close(closeEvent);
    })
}

onCancelBtnClick() {
    this.dialogRef.close();
}

get httpRequest(): Observable<Indent> {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    let payload: any = this.modalForm.indent.model
    payload.indentDetails = this.dataSource.data;
    if (this.isEdit) {
        return this.dataHandler.put<Indent>(SubcontractorIndentMetadata.serviceEndPoint, [payload]);
    } else {
        payload.isDeleted = 0;
        return this.dataHandler.post<Indent>(SubcontractorIndentMetadata.serviceEndPoint, [payload]);
    }
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
        });
}

fetchWorkNameSelectOptions()  {
    this.dataHandler.get<LabourWorkRate[]>(this.worknameServiceUrl)
        .subscribe((res: LabourWorkRate[]) => {
            if (res) {
                FormfieldHandler.worknameDropdown.templateOptions.options = res.map((e: LabourWorkRate) => (
                    {
                      label: e.labourWorkName,
                      value: e.id
                    }
                ));
            }
        });
}

get worknameServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${LabourWorkRateSettingMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
}

onAddItemBtnClick() {
    if (this.isValid) {
        const data: any = Object.assign({}, this.modalForm.itemDetails.model);
        // data.labourWorkName = this.materialList.find(e => e.id === data.materialId).materialName;
        this.dataSource.data.push(data);
        this.dataSource._updateChangeSubscription();
        this.modalForm.itemDetails.form.reset();
    }
}

get isValid() {
    if (!this.modalForm.itemDetails.model['materialId']) {
        this.snackBar.open('Warning : Please select material', null, { panelClass: 'snackbar-error-message' });
        return false;
    }
    if (!this.modalForm.itemDetails.model['quantityRequired']) {
        this.snackBar.open('Warning : Please input quantity', null, { panelClass: 'snackbar-error-message' });
        return false;
    }
    return true;
}

openDialog(rowToEdit?: Indent) {
    const data = Object.assign({}, rowToEdit);
    this.modalForm.itemDetails.model = data;
}

openDeleteDialog(rowToDelete): void {
    this.dataSource.data.splice(rowToDelete, 1);
    this.dataSource._updateChangeSubscription();
}

ngAfterViewInit() {
    const cdkDom = document.getElementsByClassName('cdk-overlay-pane');
    if (cdkDom && cdkDom.length) {
        let domStyle = cdkDom[0]['style'];
        domStyle.minWidth = '80vw';
    }
}

ngOnDestroy() {
    this.modalForm.indent.form.reset();
    this.modalForm.itemDetails.form.reset();
    this.projectDivisionFieldsHandler.clear();
}

}
