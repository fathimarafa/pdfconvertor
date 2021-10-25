import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaterialIndentCreationMetadata } from '../material-indent-creation.configuration';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IndentForm, MaterialIndent } from '../definitions/material-indent-creation.definiton';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormApprovalDialogComponent } from '../../../../common/form-approval-dialog/form-approval-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-material-indent-creation-edit',
    templateUrl: './material-indent-creation-edit.component.html',
    styleUrls: ['./material-indent-creation-edit.component.css']
})
export class MaterialIndentCreationEditComponent implements OnInit {

    isEdit: boolean;
    tableColumns = MaterialIndentCreationMetadata.itemDetails.tableColumns;
    dataSource;
    modalForm: IndentForm;
    materialList: MaterialRegistration[];
    isUpdatingUnit: boolean;

    constructor(
        private dialogRef: MatDialogRef<MaterialIndentCreationEditComponent>,
        @Inject(MAT_DIALOG_DATA) private editData: MaterialIndent,
        private dataHandler: DataHandlerService,
        private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
        private authService: AuthenticationService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router
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
                fields: MaterialIndentCreationMetadata.formFields
            },
            itemDetails: {
                form: new FormGroup({}),
                model: this.editData,
                options: {},
                fields: MaterialIndentCreationMetadata.itemDetails.formFields
            }
        }
        this.modalForm.indent.model.indentTypeId = 1;
        this.loadItemDetails()
    }

    loadItemDetails() {
        if (this.isEdit) {
            const endpoint = `${MaterialIndentCreationMetadata.serviceEndPoint}List/${this.editData.id}`;
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
        this.fetchSuppliers();
        this.fetchMaterials();
        this.bindProjectDivisionFields();
    }

    bindProjectDivisionFields() {
        const projectControllerFields: ProjectDivisionFields<MaterialIndent> = {
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



    onApproveBtnClick() {
        const isApproved = true;
        this.openApproveDialog();
        // this.modalForm.indent.model.approvedDate = new Date();
        // this.modalForm.indent.model.approvedBy = this.authService.loggedInUser.userId;
        // this.modalForm.indent.model.approvalLevel=1;
        // this.modalForm.indent.model.approvalStatus = 1;
      }
    
      onRejectBtnClick() {
        const isApproved = false;
        this.openApproveDialog();
      }


    // onSaveBtnClick(nextLevel?: boolean) {
    //     if (this.modalForm.indent.form.valid) {
    //         if (this.isEditedFromApproval) {
    //             if(this.modalForm.itemDetails.model.maxlevel=0){
    //                 this.openApproveDialog();
    //             }
                
    //         } else {
    //             if (nextLevel) {
    //                 this.modalForm.indent.model.approvedDate = new Date();
    //                 this.modalForm.indent.model.approvedBy = this.authService.loggedInUser.userId;
    //                 this.modalForm.indent.model.approvalLevel = 1;
    //             //     this.modalForm.indent.model.approvalStatus = 1;
                    
    //             // console.log("level",this.modalForm.indent.model.approvalLevel);//i
    //             // console.log("status",this.modalForm.indent.model.approvalStatus);
    //             }
    //             this.saveChanges();
    //         }
    //     }
    // }



    onSaveBtnClick(nextLevel?: boolean) {
        if (this.modalForm.indent.form.valid) {
            if (this.isEditedFromApproval) {
                this.openApproveDialog();
            } else {
                if (nextLevel) {
               
                if(this.modalForm.indent.model.maxlevel===0)
                {
                    this.modalForm.indent.model.approvalStatus=1;
                    this.modalForm.indent.model.approvedDate = new Date();
                    this.modalForm.indent.model.approvedBy = this.authService.loggedInUser.userId;
                    this.modalForm.indent.model.approvalLevel = 0;
                    // this.saveChanges(); 
                    
                    
                }
                else
                {
                    this.modalForm.indent.model.approvalLevel=1;
                    this.modalForm.indent.model.approvedDate = new Date();
                    this.modalForm.indent.model.approvedBy = this.authService.loggedInUser.userId;
                     console.log("approval level",this.modalForm.indent.model.approvalLevel)
                    // this.saveChanges(); 
                }
               
                }
              
            }
            this.saveChanges(); 
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

    get httpRequest(): Observable<MaterialIndent> {
        this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
        let payload: any = this.modalForm.indent.model
        payload.indentDetails = this.dataSource.data;
        if (this.isEdit) {
            return this.dataHandler.put<MaterialIndent>(MaterialIndentCreationMetadata.serviceEndPoint, [payload]);
        } else {
            payload.isDeleted = 0;
            return this.dataHandler.post<MaterialIndent>(MaterialIndentCreationMetadata.serviceEndPoint, [payload]);
        }
    }

    fetchSuppliers() {
        this.dataHandler.get<SupplierRegistration[]>(this.supplierServiceUrl)
            .subscribe((res: SupplierRegistration[]) => {
                if (res) {
                    FormfieldHandler.supplierDropdown.templateOptions.options = res.map((e: SupplierRegistration) => (
                        {
                            label: e.supplierName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    get supplierServiceUrl() {
        const user = this.authService.loggedInUser;
        return `${SupplierRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
    }

    fetchMaterials() {
        this.dataHandler.get<MaterialRegistration[]>(this.materialServiceUrl)
            .subscribe((res: MaterialRegistration[]) => {
                if (res) {
                    this.materialList = res;
                    FormfieldHandler.materialDropdown.templateOptions.options = res.map((e: MaterialRegistration) => (
                        {
                            label: e.materialName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    get materialServiceUrl() {
        const user = this.authService.loggedInUser;
        return `${MaterialRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
    }

    // onAddItemBtnClick() {
    //     if (this.isValid) {
    //         const data: any = Object.assign({}, this.modalForm.itemDetails.model);
    //         data.materialName = this.materialList.find(e => e.id === data.materialId).materialName;
    //         this.dataSource.data.push(data);
    //         this.dataSource._updateChangeSubscription();
    //         this.modalForm.itemDetails.form.reset();
    //     }
    // }

    onAddItemBtnClick() {
        if(this.modalForm.itemDetails.form.valid){
          if (this.isUpdatingUnit) {
            const indexToUpdate = this.dataSource.data.findIndex(row => row.id === this.modalForm.itemDetails.model.id);
            if (indexToUpdate !== -1) {
              this.dataSource.data[indexToUpdate] = Object.assign({}, this.modalForm.itemDetails.model);
              this.isUpdatingUnit = false;
            }
          } else {
            const data: any = Object.assign(
                { id: `temp-${this.dataSource.data.length + 1}` },
                this.modalForm.itemDetails.model);
        //    data.labourWorkName = this.WorknameDataset.find(e => e.id === data.workId).labourWorkName;
           this.dataSource.data.push(data);
          }
          this.dataSource._updateChangeSubscription();
          this.modalForm.itemDetails.form.reset();
        //   this.bindUnitDefaultValues();
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

    // openDialog(rowToEdit?: MaterialIndent) {
    //     const data = Object.assign({}, rowToEdit);
    //     this.modalForm.itemDetails.model = data;
    // }

    openDialog(rowToEdit) {
        this.modalForm.itemDetails.model = Object.assign({}, rowToEdit);
        this.isUpdatingUnit = true;
      }

    openDeleteDialog(rowToDelete): void {
        const indexToRemove = this.dataSource.data.findIndex(row => row.id === rowToDelete.id);
        if (indexToRemove !== -1) {
            this.dataSource.data.splice(indexToRemove, 1);
            this.dataSource._updateChangeSubscription();
            // this.dataSource.data.splice(rowToDelete, 1);
            // this.dataSource._updateChangeSubscription();
          }
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
function approvalLevel(arg0: string, approvalLevel: any) {
    throw new Error('Function not implemented.');
}

