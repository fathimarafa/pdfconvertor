import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { MaterialIssue, MaterialUsageDetails } from '../definitions/material-issue.definition';
import { MaterialIssueMetadata } from '../material-issue.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';

@Component({
  selector: 'app-material-issue-edit',
  templateUrl: './material-issue-edit.component.html',
  styleUrls: ['./material-issue-edit.component.css']
})
export class MaterialIssueEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<MaterialIssueEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialIssue,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.loadDropdowns();
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<MaterialUsageDetails> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.issued.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
    this.subscribeProjectDivison = this.projectDivisionFieldsHandler.listenProjectDivisionChange
      .subscribe((res: number) => {
        this.showHideProjectDivisionBasedFields(res);
      })
  }


  ngOnInit(): void {
    this.tableColumns = MaterialIssueMetadata.materialUsageDetails.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: MaterialIssueMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: MaterialIssueMetadata.materialUsageDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.materialUsageDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchMaterial();
    this.bindProjectDivisionFields();
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

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<MaterialIssue> {
    let payload = {
      ...this.modalForms.issued.model,
      materialUsageDetails: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<MaterialIssue>(MaterialIssueMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 1,
        userId: 1
      }
      payload = { ...payload, ...dummyDefaultFields }
      return this.dataHandler.post<MaterialIssue>(MaterialIssueMetadata.serviceEndPoint, [payload]);
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
    if (this.modalForms.usage.form.valid) {
      this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
      const dataRow: MaterialUsageDetails = Object.assign({}, this.modalForms.usage.model);
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      this.modalForms.usage.form.reset();
    }
  }

  showHideProjectDivisionBasedFields(projectDivision: number) {
    switch (projectDivision) {
      case 1:
        FormfieldHandler.unitFieldRow.hideExpression = true;
        FormfieldHandler.blockFloorRow.hideExpression = true;
        break;
      case 2:
        FormfieldHandler.unitFieldRow.hideExpression = false;
        FormfieldHandler.blockFloorRow.hideExpression = true;
        break;
      case 3:
        FormfieldHandler.unitFieldRow.hideExpression = false;
        FormfieldHandler.blockFloorRow.hideExpression = false;
        break;
      case 4:
        FormfieldHandler.unitFieldRow.hideExpression = true;
        FormfieldHandler.blockFloorRow.hideExpression = false;
        break;
    }
  }

  fetchMaterial() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    const endPoint = `${MaterialRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`;
    this.dataHandler.get<MaterialRegistration[]>(endPoint)
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

  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: MaterialUsageDetails) {
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
    this.subscribeProjectDivison.unsubscribe();
  }

}