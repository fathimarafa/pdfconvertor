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
import { FormGroup } from "@angular/forms";
import { LabourWorkRateSettingMetadata } from "../../labour-workrate-setting/labour-workrate-setting.configuration";
import { LabourWorkRate } from "../../labour-workrate-setting/definitions/labour-workrate-setting.definition";
import { AuthenticationService } from "src/app/services/auth-service/authentication.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { FormApprovalDialogComponent } from "src/app/modules/common/form-approval-dialog/form-approval-dialog.component";
import { EmployeeService } from "src/app/services/employee-service/employee.service";
import { BasicWorkCategory } from "src/app/modules/basic/components/work-category/definitions/basic-work-category.definition";
import { BasicWorkCategoryMetadata } from "src/app/modules/basic/components/work-category/basic-work-category.configuration";
import { SubContractorIndentApprovalComponentMetadata } from "../subcontractorindent-approval-new.configuration";
import { IndentForm } from"../../subcontractor-indent/definition/subcontractor-indent.definition";
import { Indent } from "../../subcontractor-indent/definition/subcontractor-indent.definition";

@Component({
    selector: 'app-subcontractor-indent-approval-edit',
    templateUrl: './subcontractor-indent-approval-edit.component.html',
    styleUrls: ['./subcontractor-indent-approval-edit.component.css']
})
export class SubcontractorIndentApprovalEditComponent implements OnInit {
 
isEdit: boolean;
iseye:boolean;
tableColumns = SubContractorIndentApprovalComponentMetadata.indentDetails.tableColumns;
dataSource;
modalForm: IndentForm;
enableItemEdit: boolean;
module;
itemTableColumns;
itemDatasource;
selectedIndent;

constructor(
    private dialogRef: MatDialogRef<SubcontractorIndentApprovalEditComponent>,
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
    this.module = SubContractorIndentApprovalComponentMetadata;
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
            fields: SubContractorIndentApprovalComponentMetadata.formFields
        },
        itemDetails: {
            form: new FormGroup({}),
            model: this.editData,
            options: {},
            fields: SubContractorIndentApprovalComponentMetadata.indentDetails.formFields
        }
    }
    this.modalForm.indent.model.indentTypeId = 2;
    this.loadItemDetails()
}

loadItemDetails() {
    if (this.isEdit) {
        const endpoint = `${SubContractorIndentApprovalComponentMetadata.serviceEndPoint}/${this.editData.id}`;
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
    this.fetchWorkCategorySelectOptions();
}

bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<Indent> = {
        projectDropdown: FormfieldHandler.projectDropdown,
        blockDropdown: FormfieldHandler.blockDropdown,
        floorDropdown: FormfieldHandler.floorDropdown,
        unitDropdown: FormfieldHandler.unitDropdown,
        model: this.modalForm.indent.model,
        isEdit: this.isEdit,
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
}

ngOnInit(): void { }

// openApproveDialog(): void {
//     const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
//     dialogRef.afterClosed().subscribe(result => {
//         if (result) {
//             this.saveChanges();
//         }
//     });
// }

// get isEditedFromApproval() {
//     return this.router.url.includes('approval');
// }

// onSaveBtnClick(nextLevel?: boolean) {
//     if (this.modalForm.indent.form.valid) {
//         if (this.isEditedFromApproval) {
//             this.openApproveDialog();
//         } else {
//             if (nextLevel) {
//                 this.modalForm.indent.model.approvedDate = new Date();
//                 this.modalForm.indent.model.approvedBy = this.authService.loggedInUser.userId;
//                 this.modalForm.indent.model.approvalLevel = 1;
//             }
//             this.saveChanges();
//         }
//     }
// }




// saveChanges() {
//     // this.httpRequest.subscribe((res) => {
//     //     const closeEvent: IDialogEvent = {
//     //         action: this.isEdit ? DialogActions.edit : DialogActions.add,
//     //         data: res || this.modalForm.indent.model
//     //     }
//     //     this.dialogRef.close(closeEvent);
//     this.httpRequest.subscribe((res) => {
//         const closeEvent: IDialogEvent = {
//           action: this.isEdit ? DialogActions.edit : DialogActions.add,
//           data: res || this.modalForm.indent.model
//         }
//         this.dialogRef.close(closeEvent);
//     })
// }

get approvalServiceUrl() {
    let user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}/${user.userId}`;
  }
  
  openApproveRemarkDialog(isApproved: boolean): void {
    // if (!this.selectedIndent) {
    //   const message = 'WARNING : Please select an indent';
    //   this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
    //   return;
    // }
     const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.saveChanges(isApproved);
        }
      });
  }
  
  onApproveBtnClick() {
    const isApproved = true;
    this.openApproveRemarkDialog(isApproved);
  }
  
  onRejectBtnClick() {
    const isApproved = false;
    this.openApproveRemarkDialog(isApproved);
    this.selectedIndent.approvalLevel= this.selectedIndent.approvalLevel-1;
  }
  
  saveChanges(isApproved: boolean) {
     
    if (isApproved) {
    //   this.selectedIndent.approvalLevel++;
    //   this.selectedIndent.approvedBy = this.authService.loggedInUser.userId;
    //   this.selectedIndent.approvedDate = new Date();
    // } else {
    //   this.selectedIndent.approvalLevel--;
    
   if(this.modalForm.indent.model.maxlevel > this.modalForm.indent.model.approvalLevel)
   {
    this.modalForm.indent.model.approvalLevel++;
    this.modalForm.indent.model.approvedBy = this.authService.loggedInUser.userId;
    this.modalForm.indent.model.approvedDate = new Date();
    }
    else
    {
        if(this.modalForm.indent.model.maxlevel === this.modalForm.indent.model.approvalLevel){
            this.modalForm.indent.model.approvalStatus=1;
            this.modalForm.indent.model.approvedBy = this.authService.loggedInUser.userId;
            this.modalForm.indent.model.approvedDate = new Date();
           }
    }
   
}  
console.log("", this.modalForm.indent.model.approvalLevel);
console.log("", this.modalForm.indent.model.approvalStatus);

// this.modalForm.indent.model.indentDetails = this.itemDatasource.data;
    this.dataHandler.put<Indent>(this.module.serviceEndPoint, [this.modalForm.indent.model]).subscribe((res) => {
      this.snackBar.open(`Indent ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
    //   const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedIndent.id);
    //   if (rowToRemove !== -1) {
    //     this.dataSource.data.splice(rowToRemove, 1);
    //     this.dataSource._updateChangeSubscription();
    //     this.itemDatasource.data = [];
    //     this.itemDatasource._updateChangeSubscription();
    //   }
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
        return this.dataHandler.put<Indent>(SubContractorIndentApprovalComponentMetadata.serviceEndPoint, [payload]);
    } else {
        payload.isDeleted = 0;
        return this.dataHandler.post<Indent>(SubContractorIndentApprovalComponentMetadata.serviceEndPoint, [payload]);
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

WorknameDataset: LabourWorkRate[];
fetchWorkNameSelectOptions()  {
    this.dataHandler.get<LabourWorkRate[]>(this.worknameServiceUrl)
        .subscribe((res: LabourWorkRate[]) => {
            this.WorknameDataset=res;
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
    const specid=2;
    return `${LabourWorkRateSettingMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}/${specid}`;
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

  private get workCategoryServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${BasicWorkCategoryMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }


  
 onUpdateDetailBtnClick() {
}

onCancelUpdateBtnClick() {

  this.enableItemEdit = false;
  this.modalForm.itemDetails.form.reset();
}

onAddItemBtnClick() {
    if (this.isValid) {
        const data: any = Object.assign({}, this.modalForm.itemDetails.model);
        data.labourWorkName = this.WorknameDataset.find(e => e.id === data.workId).labourWorkName;
        this.dataSource.data.push(data);
        this.dataSource._updateChangeSubscription();
        this.modalForm.itemDetails.form.reset();
    }
}

get isValid() {
    if (!this.modalForm.itemDetails.model['workId']) {
        this.snackBar.open('Warning : Please select material', null, { panelClass: 'snackbar-error-message' });
        return false;
    }
    if (!this.modalForm.itemDetails.model['quantityRequired']) {
        this.snackBar.open('Warning : Please input quantity', null, { panelClass: 'snackbar-error-message' });
        return false;
    }
    return true;
}

// openDialog(rowToEdit?: Indent) {
//     const data = Object.assign({}, rowToEdit);
//     this.modalForm.itemDetails.model = data;
// }

// openDeleteDialog(rowToDelete): void {
//     this.dataSource.data.splice(rowToDelete, 1);
//     this.dataSource._updateChangeSubscription();
// }

removeItem(rowIndex: number) {
   
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  onEditBtnClick(rowToEdit: Indent) {
    this.enableItemEdit = true;
    // this.modalForm.itemDetails.model  = Object.assign({}, rowToEdit);
    this.modalForm.itemDetails.model = rowToEdit;
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
