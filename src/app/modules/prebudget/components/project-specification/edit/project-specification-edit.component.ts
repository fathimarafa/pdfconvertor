import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { ProjectSpecificationMetadata } from '../project-specification.configuration'
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Observable } from 'rxjs';
import { AppEventType, AppStateService } from 'src/app/services/app-state-service/app-state.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { ProjectSpecification } from '../definitions/project-specification.definition';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';
import { ProjectMetadata } from 'src/app/modules/crm/components/project/project.configuration';
import { SpecificationRegistrationMetadata } from '../../specification-registration/specification-registration.configuration';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { DepartmentMetadata } from 'src/app/modules/hr/components/department/department.configuration';
import { Department } from 'src/app/modules/hr/components/department/definitions/department.definition';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { QuotedamountAlertModalComponent } from '../edit/quotedamount-alert-modal/quotedamount-alert-modal.component';
import { SpecificationRegistrationEditComponent } from '../../specification-registration/edit/specification-registration-edit.component';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-project-specification-edit',
  templateUrl: './project-specification-edit.component.html',
  styleUrls: ['./project-specification-edit.component.css']
})
export class ProjectSpecificationEditComponent implements OnInit {
  activedStep = 0;
  model: ProjectSpecification;
  steps;
  form: FormArray;
  options: FormlyFormOptions[];
  isEdit: boolean;
  editData;
  tabTableDef = {};
  tabsWithTable = ['spec', 'projectspec'];
  specTypes;
  loadFromSpec: boolean;

  selection = new SelectionModel<any>(true, []);

  dialogEventSubscription;

  excelImport;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private stateService: AppStateService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private dialog: MatDialog
  ) {
    this.editData = this.stateService.getState(ProjectSpecificationMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
    this.defineExcelColumns();
  }

  ngOnInit(): void {
    this.model = this.editData || {};
    this.steps = ProjectSpecificationMetadata.formFields;
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});
    FormfieldHandler.initialize(this.steps, this.dataHandler, this.authService.loggedInUser);
    this.defineTables();
    this.bindProjectDivisionFields();
    this.defineSpecTypes();
  }


  defineSpecTypes() {
    this.specTypes = [
      { value: true, label: 'Insert From Spec List' },
      { value: false, label: 'Insert From Excel' }
    ]
  }

  defineTables() {
    this.steps.forEach((step) => {
      if (step.hasTable) {
        this.tabTableDef[step.id] = {
          dataSource: new MatTableDataSource([]),
          tableColumns: ProjectSpecificationMetadata.tableColumns[step.id],
          dataColumns: ProjectSpecificationMetadata.tableColumns[step.id].map(e => e.field)
        }
        if (step.id === 'specification-details')
          this.tabTableDef[step.id].dataColumns.push('select');
      }
    });
  }

  private fetchSpecList() {
    if (!this.model['departmentId']) {
      const message = 'WARNING : Please select department';
      this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
      return;
    }
    this.dataHandler.get<any[]>(this.speclistServiceUrl).subscribe((res: any[]) => {
      this.tabTableDef['specification-details'].dataSource = new MatTableDataSource(res || []);
    });
  }

  private get speclistServiceUrl() {
    //:companyId/:branchId/:departmentId
    const user = this.authService.loggedInUser;
    return `BuildExeCRM/api/SpecificationList/${user.companyId}/${user.branchId}/${this.model['departmentId']}`
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<ProjectSpecification> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    if (step === 1) {
      this.tabTableDef['project-specification-details'].dataSource.data = this.selection.selected;
      this.tabTableDef['project-specification-details'].dataSource._updateChangeSubscription();
    }
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
    this.router.navigateByUrl('/home/projectspecification');
  }

  get httpRequest(): Observable<ProjectSpecification> {
    let payload: ProjectSpecification = { ...this.form.value[0] };
    payload.projectSpecificationDetails = this.tabTableDef['projectspec'].dataSource.data;
    if (this.isEdit) {
      return this.dataHandler.put<ProjectSpecification>(ProjectSpecificationMetadata.serviceEndPoint, [payload]);
    } else {
      return this.dataHandler.post<ProjectSpecification>(ProjectSpecificationMetadata.serviceEndPoint, [payload]);
    }
  }

  // onRowDeleteBtnClick(affectedRowIndex): void {
  //   this.tabTableDef['specification-details'].dataSource.data.splice(affectedRowIndex, 1)
  //   this.tabTableDef['specification-details'].dataSource._updateChangeSubscription();
  // }

  isSourceExcel = true;
  onLoadSpecBtnClick(isSourceExcel: boolean) {
    this.isSourceExcel = isSourceExcel;
    this.isSourceExcel ? this.openExcelConfigPopup() : this.fetchSpecList();
  }

  openExcelConfigPopup() {
    if (!this.excelImport) {
      this.defineExcelColumns();
    }
  }

  defineExcelColumns() {
    this.excelImport = {
      column: Array(5).fill(0).map((x, i) => i + 1),
      mapping: ['SpecNumber', 'SpecName', 'SpecDescription', 'Quantity'].map(e => {
        return { name: e, column: null }
      })
    }
  }

  isAllSelected() {
    const totalSelected = this.selection.selected.length;
    const totalRows = this.specDatatable.data.length;
    return totalSelected === totalRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.specDatatable.data.forEach(row => this.selection.select(row));
  }

  private get specDatatable() {
    return this.tabTableDef['specification-details'].dataSource;
  }

  onCheckboxChange(event, row) {
    event ? this.selection.toggle(row) : null;
    if (event.checked) {
      row.quantity = 1;
      row.quotedRatePerUnit = row.ratePerUnit;
      row.specAmount = row.ratePerUnit * row.quantity;
      row.deptAmount = row.deptRatePerUnit * row.quantity;
      row.quotedAmount = row.quotedRatePerUnit * row.quantity;
      this.projectSpecDatatable.data.push(row);
    } else {
      const index = this.projectSpecDatatable.data.findIndex(e => e.id === row.id);
      if (index !== -1) {
        this.projectSpecDatatable.data.splice(index, 1);
      }
    }
    this.projectSpecDatatable._updateChangeSubscription();
  }

  private get projectSpecDatatable() {
    return this.tabTableDef['project-specification-details'].dataSource;
  }

  onQuantityChange(row) {
    row.specAmount = row.ratePerUnit * row.quantity;
    row.deptAmount = row.deptRatePerUnit * row.quantity;
    this.calculateQuotedAmount(row);
  }

  onQuotedAmountChange(row) {
    if (row.quotedRatePerUnit < row.ratePerUnit) {
      const profit = row.contractorProfitAmt + row.other_expense;
      const discount = row.ratePerUnit - row.quotedRatePerUnit;
      if (discount > profit) {
        const dialogReference = this.dialog.open(QuotedamountAlertModalComponent, { data: row });
        dialogReference.afterClosed().subscribe((isConfirmed) => {
          if (isConfirmed) {
            this.stateService.setState(SpecificationRegistrationMetadata.moduleId, row);
            const dialogRef = this.dialog.open(SpecificationRegistrationEditComponent);
            this.listenSpecEntryDialogClose(dialogRef);
          } else {
            row.quotedRatePerUnit = row.ratePerUnit;
          }
          this.calculateQuotedAmount(row);
        });
      } else {
        this.calculateQuotedAmount(row);
      }
    } else {
      this.calculateQuotedAmount(row);
    }
  }


  private listenSpecEntryDialogClose(dialogRef) {
    this.dialogEventSubscription = this.stateService.listenChange(AppEventType.specRegDialogClose).subscribe(() => {
      dialogRef.close();
      this.dialogEventSubscription.unsubscribe();
    })
  }

  calculateQuotedAmount(row) {
    row.quotedAmount = row.quotedRatePerUnit * row.quantity;
    this.specDatatable._updateChangeSubscription();
  }

  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects
    };
 }

  ngOnDestroy() {
    this.form.reset();
    if (this.isEdit) {
      this.stateService.clear(ProjectSpecificationMetadata.moduleId);
    }
    this.projectDivisionFieldsHandler.clear();
    if (this.dialogEventSubscription) {
      this.dialogEventSubscription.unsubscribe();
    }
  }

}
