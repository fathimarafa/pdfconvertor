import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { DamageStockEntryMetadata } from '../damage-stock-entry.configuration';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { DamageStockEntry } from '../definitions/damage-stock-entry.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { Router } from '@angular/router';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-damage-stock-entry-edit',
  templateUrl: './damage-stock-entry-edit.component.html',
  styleUrls: ['./damage-stock-entry-edit.component.css']
})
export class DamageStockEntryEditComponent implements OnInit {

  form = new FormGroup({});
  model: DamageStockEntry;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  isBlockFloorLoaded: boolean;
  projectDivision: number;

  constructor(
    private dialogRef: MatDialogRef<DamageStockEntryEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: DamageStockEntry,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = DamageStockEntryMetadata.formFields;
    this.model = this.editData;
    this.bindFormSelectOptions();
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
    if (this.form.valid) {
      if (this.isEditedFromApproval) {
        this.openApproveDialog();
      } else {
        if (nextLevel) {
          this.model.approvedBy = this.authService.loggedInUser.userId;
          this.model.approvalLevel = 1;
        }
        this.saveChanges();
      }
    }
  }

  saveChanges() {
    this.httpRequest.subscribe((res) => {
      const closeEvent: IDialogEvent = {
        action: this.isEdit ? DialogActions.edit : DialogActions.add,
        data: res || this.model
      };
      this.dialogRef.close(closeEvent);
    })
  }

  get httpRequest(): Observable<DamageStockEntry> {
    if (this.isEdit) {
      return this.dataHandler.put<DamageStockEntry>(DamageStockEntryMetadata.serviceEndPoint, this.payload);
    } else {
      return this.dataHandler.post<DamageStockEntry>(DamageStockEntryMetadata.serviceEndPoint, this.payload);
    }
  }

  get payload(): DamageStockEntry {
    const defaultPayload = {
      entrydate: new Date().toISOString(),
      projectId: 0,
      unitId: 0,
      blockId: 0,
      floorId: 0,
      materialId: 0,
      stock: 0,
      rate: 0,
      finantialYearId: 0,
      companyId: 1,
      branchId: 0,
      approvalStatus: 0,
      approvedBy: 0,
      approvalLevel: 0
    }
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    const data = { ...defaultPayload, ...this.model };
    if (typeof (data.approvalStatus) === 'boolean') {
      data.approvalStatus = data.approvalStatus ? 1 : 0;
    }
    return data;
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  bindFormSelectOptions() {
    this.fetchMaterialSelectOptions();
    const projectControllerFields: ProjectDivisionFields<DamageStockEntry> = {
      projectDropdown: this.projectDropdown,
      blockDropdown: this.blockDropdown,
      floorDropdown: this.floorDropdown,
      unitDropdown: this.unitDropdown,
      model: this.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }

  get projectDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'project-unit').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'projectId');
  }

  get unitDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'project-unit').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'unitId');
  }

  get blockFloorDropdown(): FormlyFieldConfig {
    return this.fields.find((x: FormlyFieldConfig) => x.id === 'block-floor');
  }

  get blockDropdown(): FormlyFieldConfig {
    return this.blockFloorDropdown.fieldGroup.find(x => x.key === 'blockId');
  }

  get floorDropdown(): FormlyFieldConfig {
    return this.blockFloorDropdown.fieldGroup.find(x => x.key === 'floorId');
  }

  get materialDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'material-row').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'materialId');
  }

  fetchMaterialSelectOptions() {
    this.dataHandler.get<MaterialRegistration[]>(this.materialServiceUrl)
      .subscribe((res: MaterialRegistration[]) => {
        if (res) {
          this.materialDropdown.templateOptions.options = res.map((e: MaterialRegistration) => (
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

  ngOnDestroy() {
    this.projectDivisionFieldsHandler.clear();
  }

}
