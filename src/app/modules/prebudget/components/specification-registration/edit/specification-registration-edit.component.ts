import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { SpecificationRegistrationMetadata } from '../specification-registration.configuration';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Observable } from 'rxjs';
import { Specification, SpecificationDetail, SpecificationDetailsTabId, StepType } from '../definitions/specification-registration.definition';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-specification-registration-edit',
  templateUrl: './specification-registration-edit.component.html',
  styleUrls: ['./specification-registration-edit.component.css']
})
export class SpecificationRegistrationEditComponent implements OnInit {

  activedStep = 0;
  model: Specification;
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];
  isEdit: boolean;
  editData;
  enableRowEdit: boolean;
  tabTableDef = {};
  tableColumns;
  dataSource;
  tabsWithTable = ['material', 'labour', 'subcontr'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private stateService: AppStateService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.editData = this.stateService.getState(SpecificationRegistrationMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
    this.model = this.editData || {};
    this.tableColumns = SpecificationRegistrationMetadata.specificationDetailsTable;
    this.defineTables();
    this.steps = SpecificationRegistrationMetadata.formFields;
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});
    FormfieldHandler.loadDropdowns(this.steps, this.dataHandler, this.authService.loggedInUser);
  }

  defineTables() {
    this.tabsWithTable.forEach((tab: string) => {
      this.tabTableDef[tab] = {
        dataSource: new MatTableDataSource(this.getTableRows(tab)),
        tableColumns: this.getColumns(tab)
      }
      this.tabTableDef[tab]['dataColumns'] = this.tabTableDef[tab].tableColumns.map(e => e.field);
    });
  }

  private getTableRows(tab: string): SpecificationDetail[] {
    let tableRows: SpecificationDetail[] = [];
    if (this.isEdit) {
      switch (tab) {
        case SpecificationDetailsTabId.labour:
          tableRows = this.model.specificationDetails.filter(e => e.specItemTypeId === 1);
          break;
        case SpecificationDetailsTabId.subcontr:
          tableRows = this.model.specificationDetails.filter(e => e.specItemTypeId === 2);
          break;
        case SpecificationDetailsTabId.material:
          tableRows = this.model.specificationDetails.filter(e => e.specItemTypeId === 3);
          break;
      }
    }
    tableRows.forEach((row: SpecificationDetail) => {
      row['amount'] = row.qtyRequired * row.rateOfItem;
    })
    return tableRows;
  }

  getColumns(tab: string) {
    let columns = JSON.parse(JSON.stringify(this.tableColumns));
    let index;
    switch (tab) {
      case SpecificationDetailsTabId.material:
        columns[1].displayName = 'Material';
        break;
      case SpecificationDetailsTabId.labour:
        columns[1].displayName = 'Labour';
        index = columns.findIndex(e => e.field === 'rateOfConveyance');
        columns.splice(index, 1);
        break;
      case SpecificationDetailsTabId.subcontr:
        columns[1].displayName = 'Sub Contractor';
        index = columns.findIndex(e => e.field === 'rateOfConveyance');
        columns.splice(index, 1);
        break;
    }
    return columns;
  }


  showTable(id: string): boolean {
    return this.tabsWithTable.includes(id);
  }

  ngOnInit(): void { }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
        this.onCancelBtnClick();
      })
    }
  }

  onCancelBtnClick() {
    this.router.navigateByUrl('/home/specification');
  }

  get httpRequest(): Observable<Specification> {
    let payload: Specification = { ...this.form.value[0], ...this.form.value[4] };
    payload.specificationDetails = this.getSpecificaitonDetailsFromTable();
    if (this.isEdit) {
      payload.id = this.model.id;
      return this.dataHandler.put<Specification>(SpecificationRegistrationMetadata.serviceEndPoint, [payload]);
    } else {
      payload.companyId = 1;
      payload.branchId = 0;
      return this.dataHandler.post<Specification>(SpecificationRegistrationMetadata.serviceEndPoint, [payload]);
    }
  }

  private getSpecificaitonDetailsFromTable(): SpecificationDetail[] {
    let specificationData: SpecificationDetail[] = [];
    for (let tab in this.tabTableDef) {
      this.tabTableDef[tab].dataSource.data.forEach((e: SpecificationDetail) => {
        switch (tab) {
          case SpecificationDetailsTabId.labour:
            e.specItemTypeId = 1;
            break;
          case SpecificationDetailsTabId.subcontr:
            e.specItemTypeId = 2;
            break;
          case SpecificationDetailsTabId.material:
            e.specItemTypeId = 3;
            break;
        }
        specificationData.push(e);
      });
    }
    return specificationData;
  }

  onRowEditBtnClick(rowToEdit: SpecificationDetail, tab) {
    this.enableRowEdit = true;
    switch (tab) {
      case SpecificationDetailsTabId.material:
        this.model = { ...this.model, ...rowToEdit };
        break;
      case SpecificationDetailsTabId.labour:
        this.model = { ...this.model, ...rowToEdit }
        break;
      case SpecificationDetailsTabId.subcontr:
        this.model = { ...this.model, ...rowToEdit }
        break;
    }
  }

  onRowDeleteBtnClick(affectedRowIndex, tabId): void {
    this.tabTableDef[tabId].dataSource.data.splice(affectedRowIndex, 1)
    this.tabTableDef[tabId].dataSource._updateChangeSubscription();
  }


  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  onAddDetailBtnClick(form, tabId) {
    if (Object.values(form.value).includes(null)) return;
    const data = Object.assign({}, form.value);
    data['amount'] = data.qtyRequired * data.rateOfItem;
    this.tabTableDef[tabId].dataSource.data.push(Object.assign({}, data));
    this.tabTableDef[tabId].dataSource._updateChangeSubscription();
  }

  ngOnDestroy() {
    this.form.reset();
    if (this.isEdit) {
      this.stateService.clear(SpecificationRegistrationMetadata.moduleId);
    }
  }

}
