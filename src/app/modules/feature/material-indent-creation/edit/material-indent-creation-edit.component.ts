import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MaterialIndentCreationMetadata } from '../material-indent-creation.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { MaterialIndent } from '../definitions/material-indent-creation.definiton';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';

@Component({
    selector: 'app-material-indent-creation-edit',
    templateUrl: './material-indent-creation-edit.component.html',
    styleUrls: ['./material-indent-creation-edit.component.css']
})
export class MaterialIndentCreationEditComponent implements OnInit {

    form = new FormGroup({});
    model: MaterialIndent;
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[];
    isEdit: boolean;
    subscribeProjectDivison: Subscription;

    constructor(
        private dialogRef: MatDialogRef<MaterialIndentCreationEditComponent>,
        @Inject(MAT_DIALOG_DATA) private editData: MaterialIndent,
        private dataHandler: DataHandlerService,
        private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
    ) {
        if (Object.keys(this.editData).length) {
            this.isEdit = true;
        }
        this.fields = MaterialIndentCreationMetadata.formFields;
        this.model = this.editData;
        this.model['blockId'] = this.model.bockId; // service typo error
        FormfieldHandler.initialize(this.fields);
        this.loadDropdowns();
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
            model: this.model,
            isEdit: this.isEdit
        };
        this.projectDivisionFieldsHandler.initialize(projectControllerFields);
        this.subscribeProjectDivison = this.projectDivisionFieldsHandler.listenProjectDivisionChange
            .subscribe((res: number) => {
                this.showHideProjectDivisionBasedFields(res);
            })
    }

    showHideProjectDivisionBasedFields(projectDivision: number) {
        switch (projectDivision) {
            case 1:
                FormfieldHandler.unitDropdown.hideExpression = true;
                FormfieldHandler.blockDropdown.hideExpression = true;
                FormfieldHandler.floorDropdown.hideExpression = true;
                break;
            case 2:
                FormfieldHandler.unitDropdown.hideExpression = false;
                FormfieldHandler.blockDropdown.hideExpression = true;
                FormfieldHandler.floorDropdown.hideExpression = true;
                break;
            case 3:
                FormfieldHandler.unitDropdown.hideExpression = false;
                FormfieldHandler.blockDropdown.hideExpression = false;
                FormfieldHandler.floorDropdown.hideExpression = false;
                break;
            case 4:
                FormfieldHandler.unitDropdown.hideExpression = true;
                FormfieldHandler.blockDropdown.hideExpression = false;
                FormfieldHandler.floorDropdown.hideExpression = false;
                break;
        }
    }

    ngOnInit(): void { }

    onSaveBtnClick() {
        if (this.form.valid) {
            this.httpRequest.subscribe((res) => {
                const closeEvent: IDialogEvent = {
                    action: this.isEdit ? DialogActions.edit : DialogActions.add,
                    data: res || this.model
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
        this.model.bockId =  this.model['blockId'];//service typo error
        if (this.isEdit) {
            return this.dataHandler.put<MaterialIndent>(MaterialIndentCreationMetadata.serviceEndPoint, this.model);
        } else {
            const defaultDummyFields = { purchaseFlag: 13, workId: 14, subContractorId: 15, approvedDate: new Date().toISOString(), approvedBy: 1, companyId: 1, branchId: 1, isDeleted: 0, approvalLevel: 1 };
            const payload = { ...defaultDummyFields, ...this.model };
            return this.dataHandler.post<MaterialIndent>(MaterialIndentCreationMetadata.serviceEndPoint, payload);
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

    ngOnDestroy() {
        this.form.reset();
        this.projectDivisionFieldsHandler.clear();
        this.subscribeProjectDivison.unsubscribe();
    }

}
