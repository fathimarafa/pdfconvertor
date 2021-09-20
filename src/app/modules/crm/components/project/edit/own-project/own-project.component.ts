import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { OwnProjectMetadata } from './own-project.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../../services/datahandler/datahandler.service';
import { OwnProject } from './definitions/own-project.definition';
import { DepartmentMetadata } from 'src/app/modules/hr/components/department/department.configuration';
import { Department } from 'src/app/modules/hr/components/department/definitions/department.definition';
import { FormfieldHandler } from './handlers/form-field.handler';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ProjectMetadata } from '../../project.configuration';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';
import { Project } from '../../definitions/project.definition';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-own-project',
  templateUrl: './own-project.component.html',
  styleUrls: ['./own-project.component.css']
})
export class OwnProjectComponent implements OnInit {

  isEdit: boolean;

  modalForms;
  tableColumns;
  dataSource;

  constructor(
    private dialogRef: MatDialogRef<OwnProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: OwnProject,
    private dataHandler: DataHandlerService,
    private snackbar: MatSnackBar
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineFormMetadata();
    this.loadDropdown();
    this.dataSource = new MatTableDataSource([]);
  }

  loadDropdown() {
    this.loadDepartmentDropdown();
    FormfieldHandler.loadDropdowns(this.modalForms.child.fields, this.dataHandler);
    this.listenFormChangeEvents();
  }

  private defineFormMetadata() {
    this.modalForms = {
      main: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: OwnProjectMetadata.formFields
      },
      child: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: OwnProjectMetadata.unit.formFields
      }
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit(): void {
    this.tableColumns = OwnProjectMetadata.unit.tableColumns
  }

  ngAfterViewInit() {
    const cdkDom = document.getElementsByClassName('cdk-overlay-pane');
    if (cdkDom && cdkDom.length) {
      let domStyle = cdkDom[0]['style'];
      domStyle.maxWidth = '95vw';
      // domStyle.height = '94vh';
    }
  }

  onSaveBtnClick() {
    if (this.modalForms.main.form.valid) {
      this.saveProject();
    }
  }

  saveProject() {
    this.projectHttpRequest.subscribe((res) => {
      const projectId = res ? res.id : this.modalForms.main.model.id;
      this.saveUnits(projectId);
    })
  }

  get projectHttpRequest(): Observable<Project> {
    if (this.isEdit) {
      const endPoint = `${ProjectMetadata.serviceEndPoint}/${this.modalForms.main.model.id}`;
      return this.dataHandler.put<Project>(endPoint, this.modalForms.main.model);
    } else {
      const dummyFields = { companyId: 1, branchId: 1, userId: 1 };
      this.modalForms.main.model.projectTypeId = 'OP';
      return this.dataHandler.post<Project>(ProjectMetadata.serviceEndPoint, { ...this.modalForms.main.model, ...dummyFields });
    }
  }

  saveUnits(projectId) {
    this.modalForms.child.model.projectId = projectId;
    this.unitHttpRequest.subscribe((res) => {
      const closeEvent: IDialogEvent = {
        action: this.isEdit ? DialogActions.edit : DialogActions.add,
        data: this.modalForms.main.model
      }
      this.dialogRef.close(closeEvent);
    })
  }

  get unitHttpRequest(): Observable<OwnProject> {
    const payload = this.dataSource.data.map(e => e.projectId = this.modalForms.child.model.projectId);
    if (this.isEdit) {
      const endPoint = `${ProjectMetadata.serviceEndPoint}/${this.modalForms.child.model.id}`;
      return this.dataHandler.put<OwnProject>(endPoint, payload);
    } else {
      return this.dataHandler.post<OwnProject>(OwnProjectMetadata.serviceEndPoint, payload);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  private get departmentDropdown(): FormlyFieldConfig {
    return this.modalForms.main.fields.find((x: FormlyFieldConfig) => x.key === 'departmentId');
  }

  private loadDepartmentDropdown() {
    this.dataHandler.get(DepartmentMetadata.serviceEndPoint)
      .subscribe((res: Department[]) => {
        const privateDept = res.filter(e => e.departmentCategory.toUpperCase() === 'PRIVATE');
        if (privateDept && privateDept.length) {
          this.departmentDropdown.templateOptions.options = privateDept.map((e: Department) => (
            {
              label: e.departmentLongName,
              value: e.departmentId
            }
          ));
        } else {
          this.snackbar.open('WARNING : No private department found');
        }
      });
  }

  onAddUnitsBtnClick() {
    this.dataSource.data.push(this.modalForms.child.model);
    this.dataSource._updateChangeSubscription();
    this.modalForms.child.form.reset();
  }

  private listenFormChangeEvents() {
    this.listenScalableAreaCostFieldChange();
    this.listenTerraceCostFieldChange();
    this.listenTotalAreaCostFieldChange();
    this.listenLandCostFieldChange();
    this.modalForms.child.model.totalAmount = 0;
  }

  /* total scalable area cost */

  private listenScalableAreaCostFieldChange() {
    FormfieldHandler.carpetAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onScalableAreaFieldChange();
    }
    FormfieldHandler.commonAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onScalableAreaFieldChange();
    }
    FormfieldHandler.balconyAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onScalableAreaFieldChange();
    }
    FormfieldHandler.workAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onScalableAreaFieldChange();
    }
    FormfieldHandler.ratePerAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onScalableAreaFieldChange();
    }
  }

  private onScalableAreaFieldChange() {
    this.modalForms.child.model['scalableWorkArea'] = this.modalForms.child.model.carpetArea + this.modalForms.child.model.commonArea + this.modalForms.child.model.balconyArea + this.modalForms.child.model.workArea;
    this.modalForms.child.model['scalableWorkAreaCost'] = this.modalForms.child.model['scalableWorkArea'] * this.modalForms.child.model.ratePerArea;
    this.calculateTotalAreaCost();
  }

  /* total terrace area cost */

  private listenTerraceCostFieldChange() {
    FormfieldHandler.privateTerraceDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onTerraceFieldChange();
    }
    FormfieldHandler.terraceRateDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onTerraceFieldChange();
    }
    FormfieldHandler.carParkingDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onTerraceFieldChange();
    }
  }

  private onTerraceFieldChange() {
    this.modalForms.child.model['terraceTotalCost'] = (this.modalForms.child.model.privateTerrace * this.modalForms.child.model.terraceRate) + this.modalForms.child.model.carParking;
    this.calculateTotalAreaCost();
  }

  /* total area cost */

  private listenTotalAreaCostFieldChange() {
    FormfieldHandler.gstDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onTotalAreaCostChange();
    }
    FormfieldHandler.kfcDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onTotalAreaCostChange();
    }
  }

  private onTotalAreaCostChange() {
    let gstPerOfValue = this.modalForms.child.model['totalAreaCost'] * (this.modalForms.child.model.gst / 100);
    let kfcPerOfValue = this.modalForms.child.model['totalAreaCost'] * (this.modalForms.child.model.kfc / 100);
    this.modalForms.child.model['totalAreaCostWithTax'] = this.modalForms.child.model['totalAreaCost'] + gstPerOfValue + kfcPerOfValue;
    this.calculateTotalCost();
  }


  /* total land cost */

  private listenLandCostFieldChange() {
    FormfieldHandler.landCostDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onLandCostFieldChange();
    }
    FormfieldHandler.landRateDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onLandCostFieldChange();
    }
    FormfieldHandler.landgstDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onLandCostFieldChange();
    }
    FormfieldHandler.landkfcDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onLandCostFieldChange();
    }
  }

  private onLandCostFieldChange() {
    let landCost = this.modalForms.child.model.landCost * this.modalForms.child.model.landRate;
    let gstPerOfValue = landCost * (this.modalForms.child.model.landgst / 100);
    let kfcPerOfValue = landCost * (this.modalForms.child.model.landkfc / 100);
    this.modalForms.child.model['totalLandCost'] = landCost + gstPerOfValue + kfcPerOfValue;
    this.calculateTotalCost();
  }

  private calculateTotalAreaCost() {
    this.modalForms.child.model['totalAreaCost'] = this.modalForms.child.model['scalableWorkAreaCost'] + this.modalForms.child.model['terraceTotalCost'];
    this.onTotalAreaCostChange();
  }

  private calculateTotalCost() {
    this.modalForms.child.model.totalAmount = this.modalForms.child.model['totalAreaCostWithTax'] + this.modalForms.child.model['totalLandCost'];
    this.modalForms.child.model = { ...this.modalForms.child.model };
  }

  ngOnDestroy() {
    this.modalForms.main.form.reset();
    this.modalForms.child.form.reset();
  }


}
