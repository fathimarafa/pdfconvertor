import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { ProjectSpecificationMetadata } from '../project-specification.configuration'
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Observable } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';
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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private stateService: AppStateService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
  ) {
    this.editData = this.stateService.getState(ProjectSpecificationMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
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
    this.router.navigateByUrl('/home/specification');
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

  onLoadSpecBtnClick(isSourceExcel: boolean) {
    isSourceExcel ? this.openExcelConfigPopup() : this.fetchSpecList();
  }

  openExcelConfigPopup() {

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

  ngOnDestroy() {
    this.form.reset();
    if (this.isEdit) {
      this.stateService.clear(ProjectSpecificationMetadata.moduleId);
    }
    this.projectDivisionFieldsHandler.clear();
  }

}
