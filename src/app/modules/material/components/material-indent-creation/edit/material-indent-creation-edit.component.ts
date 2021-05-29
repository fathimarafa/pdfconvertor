import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MaterialIndentCreationMetadata } from '../material-indent-creation.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IndentForm, MaterialIndent } from '../definitions/material-indent-creation.definiton';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-material-indent-creation-edit',
    templateUrl: './material-indent-creation-edit.component.html',
    styleUrls: ['./material-indent-creation-edit.component.css']
})
export class MaterialIndentCreationEditComponent implements OnInit {

    isEdit: boolean;
    subscribeProjectDivison: Subscription;

    tableColumns = MaterialIndentCreationMetadata.itemDetails.tableColumns;
    dataSource;

    modalForm: IndentForm;

    constructor(
        private dialogRef: MatDialogRef<MaterialIndentCreationEditComponent>,
        @Inject(MAT_DIALOG_DATA) private editData: MaterialIndent,
        private dataHandler: DataHandlerService,
        private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
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
                model: {},
                options: {},
                fields: MaterialIndentCreationMetadata.itemDetails.formFields
            }
        }
        this.modalForm.indent.model.indentTypeId = 1;
        this.dataSource = new MatTableDataSource(this.editData.indentDetails || [])
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

    onSaveBtnClick() {
        if (this.modalForm.indent.form.valid) {
            this.httpRequest.subscribe((res) => {
                const closeEvent: IDialogEvent = {
                    action: this.isEdit ? DialogActions.edit : DialogActions.add,
                    data: res || this.modalForm.indent.model
                }
                this.dialogRef.close(closeEvent);
            })
        }
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
            const defaultDummyFields = { purchaseFlag: 13, workId: 14, subContractorId: 15, approvedDate: new Date().toISOString(), approvedBy: 1, companyId: 1, branchId: 1, isDeleted: 0, approvalLevel: 1 };
            payload = { ...defaultDummyFields, ...payload };
            console.log(payload);
            return this.dataHandler.post<MaterialIndent>(MaterialIndentCreationMetadata.serviceEndPoint, [payload]);
        }
    }

    fetchSuppliers() {
        const dummyCompanyId = 1; const dummyBranchId = 0;
        this.dataHandler.get<SupplierRegistration[]>(`${SupplierRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
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

    fetchMaterials() {
        const dummyCompanyId = 1; const dummyBranchId = 0;
        this.dataHandler.get<MaterialRegistration[]>(`${MaterialRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
            .subscribe((res: MaterialRegistration[]) => {
                if (res) {
                    FormfieldHandler.materialDropdown.templateOptions.options = res.map((e: MaterialRegistration) => (
                        {
                            label: e.materialName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    onAddItemBtnClick() {
        if (this.modalForm.itemDetails.form.valid) {
            const data: any = Object.assign({}, this.modalForm.itemDetails.model);
            this.dataSource.data.push(data);
            this.dataSource._updateChangeSubscription();
        }
    }

    openDialog(rowToEdit?: MaterialIndent) {
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
        this.subscribeProjectDivison.unsubscribe();
    }

}
