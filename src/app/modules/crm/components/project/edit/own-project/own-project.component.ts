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
  isUpdatingUnit: boolean;

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
  }

  loadDropdown() {
    this.loadDepartmentDropdown();
    FormfieldHandler.loadDropdowns(this.modalForms.child.fields, this.dataHandler);
    this.listenFormChangeEvents();
  }

  loadProjectUnits() {
    const endpoint = `${OwnProjectMetadata.serviceEndPoint}/${this.editData.id}`
    this.dataHandler.get(endpoint).subscribe((res: any[]) => {
      this.dataSource = new MatTableDataSource(res);
    })
  }

  private defineFormMetadata() {
    this.modalForms = {
      main: {
        form: new FormGroup({}),
        model: this.editData || {},
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
    this.defineFormMetadata();
    this.loadDropdown();
    if (this.isEdit) {
      this.loadProjectUnits();
    } else {
      this.dataSource = new MatTableDataSource([]);
    }
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
      const projectId = res ? res : this.modalForms.main.model.id;
      if (this.dataSource.data.length) {
        this.saveUnits(projectId);
      } else {
        // this.snackbar.open('WARNING : No private department found');
        this.closeModal();
      }
    })
  }

  get projectHttpRequest(): Observable<Project> {
    if (this.isEdit) {
      // const endPoint = `${ProjectMetadata.serviceEndPoint}/${this.modalForms.main.model.id}`;
      return this.dataHandler.put<Project>(ProjectMetadata.serviceEndPoint, this.modalForms.main.model);
    } else {
      this.modalForms.main.model.projectTypeId = 'OP';
      return this.dataHandler.post<Project>(ProjectMetadata.serviceEndPoint, this.modalForms.main.model);
    }
  }

  saveUnits(projectId) {
    this.modalForms.child.model.projectId = projectId;
    this.unitHttpRequest.subscribe((res) => {
      this.closeModal();
    })
  }

  closeModal() {
    const closeEvent: IDialogEvent = {
      action: this.isEdit ? DialogActions.edit : DialogActions.add,
      data: this.modalForms.main.model
    }
    this.dialogRef.close(closeEvent);
  }

  get unitHttpRequest(): Observable<OwnProject> {
    this.dataSource.data.forEach(row => {
      if (typeof (row.id) === 'string' && row.id.startsWith('temp')) {
        delete row.id; // delete temp id
      }
      row.projectId = this.modalForms.child.model.projectId;
    })
    if (this.isEdit) {
      // const endPoint = `${OwnProjectMetadata.serviceEndPoint}/${this.modalForms.child.model.projectId}`;
      return this.dataHandler.put<OwnProject>(OwnProjectMetadata.serviceEndPoint, this.dataSource.data);
    } else {
      return this.dataHandler.post<OwnProject>(OwnProjectMetadata.serviceEndPoint, this.dataSource.data);
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
    if(this.modalForms.child.form.valid){
      if (this.isUpdatingUnit) {
        const indexToUpdate = this.dataSource.data.findIndex(row => row.id === this.modalForms.child.model.id);
        if (indexToUpdate !== -1) {
          this.dataSource.data[indexToUpdate] = Object.assign({}, this.modalForms.child.model);
          this.isUpdatingUnit = false;
        }
      } else {
        const unitIdExist = this.dataSource.data.find(row=>row.unitId === this.modalForms.child.model.unitId);
        if(unitIdExist){
          this.snackbar.open('WARNING : Unit Id already exist');
          return;
        }
        this.dataSource.data.push(Object.assign(
          { id: `temp-${this.dataSource.data.length + 1}` },
          this.modalForms.child.model
        ));
      }
      this.dataSource._updateChangeSubscription();
      this.modalForms.child.form.reset();
      this.bindUnitDefaultValues();
    }
  }

  bindUnitDefaultValues() {
    this.modalForms.child.model = {
      balconyArea: 0,
      carParking: 0,
      carpetArea: 0,
      commonArea: 0,
      gst: 0,
      kfc: 0,
      landCost: 0,
      landRate: 0,
      landgst: 0,
      landkfc: 0,
      privateTerrace: 0,
      ratePerArea: 0,
      scalableWorkArea: 0,
      scalableWorkAreaCost: 0,
      terraceRate: 0,
      terraceTotalCost: 0,
      totalAmount: 0,
      totalAreaCost: 0,
      totalAreaCostWithTax: 0,
      totalLandCost: 0,
      workArea: 0
    }
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

  onDeleteRowBtnClick(selectedRow) {
    const indexToRemove = this.dataSource.data.findIndex(row => row.id === selectedRow.id);
    if (indexToRemove !== -1) {
      this.dataSource.data.splice(indexToRemove, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  onEditRow(row) {
    this.modalForms.child.model = Object.assign({}, row);
    this.isUpdatingUnit = true;
  }

}
