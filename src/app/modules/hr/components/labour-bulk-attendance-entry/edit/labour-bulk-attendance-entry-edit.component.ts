import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { LabourBulkAttendanceEntryMetadata } from '../labour-bulk-attendance-entry.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Observable } from 'rxjs';
import { IDropdown, IEmployee, IEmployeeCategory } from '../../employee-registration/definitions/employee.definiton';
import { EmployeeRegistrationMetadata } from '../../employee-registration/employee-registration.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { ProjectDivisionFields , ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IDialogEvent, DialogActions } from 'src/app/definitions/dialog.definitions';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { BulkAttendanceEntry } from '../definitions/attendance-monthly.definition';

@Component({
  selector: 'app-labour-bulk-attendance-entry-edit',
  templateUrl: './labour-bulk-attendance-entry-edit.component.html',
  styleUrls: ['./labour-bulk-attendance-entry-edit.component.css']
})
export class LabourBulkAttendanceEntryEditComponent implements OnInit {

  form = new FormGroup({});
  model: BulkAttendanceEntry;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  employeeList: IEmployee[];
  projectDivision: number;
  displayEmployeeTable: boolean;
  dataSource;
  module;
  employeeTableColmns;
  attendanceDetails: BulkAttendanceEntry;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  
  constructor(
    private dialogRef: MatDialogRef<LabourBulkAttendanceEntryEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: BulkAttendanceEntry,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = LabourBulkAttendanceEntryMetadata.formFields;
    this.model = this.editData;
    this.displayEmployeeTable = false;
    this.module = LabourBulkAttendanceEntryMetadata;
    this.employeeTableColmns = this.module.employeeTableColmns

    this.bindFormSelectOptions()
  }

  ngOnInit(): void { }

  get dataColumnsEmployee() {
    if (this.employeeTableColmns && this.employeeTableColmns.length) {
      return this.employeeTableColmns.map(col => col.field);
    } else {
      return [];
    }
  }

  get employeeCategory(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'category');
  }

  get employeeGroup(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'employeeGroupId');
  }
  
  get labourHeadList(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'labourHeadId');
  }

  get projectDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'projectId');
  }
  get blockDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'blockId');
  }
  get floorDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'floorId');
  }

  get unitDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'unitId');
  }

  get workCategoryDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'workCategoryId');
  }

  get payload(): BulkAttendanceEntry[] {
    const defaultPayload = {
      dateWorked: new Date().toISOString(),
      companyId: this.authService.loggedInUser.companyId,
      branchId: this.authService.loggedInUser.branchId,
      //employeeId: this.editData.employeeId,
      projectId: 0,
      unitId: 0,
      blockId: 0,
      floorId: 0,
      approvalLevel: 0,
      approvalStatus: 1,
      approvedBy: 1,
      approvedDate: new Date().toISOString(),
      financialYearId: 2
    }

    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    const commondata = { ...defaultPayload, ...this.model };
    if (typeof (commondata.approvalStatus) === 'boolean') {
      commondata.approvalStatus = commondata.approvalStatus ? 1 : 0;
    }

    const data = this.constuctPayload(commondata, this.dataSource.data);

    return data;
  }

  constuctPayload(generic, source): BulkAttendanceEntry[] {
    return source.map(table => ({
      Amount: table.salaryAmount,
      ApprovalLevel: generic.approvalLevel,
      ApprovalStatus: generic.approvalStatus,
      ApprovedBy: generic.approvedBy,
      ApprovedDate: generic.approvedDate,
      BlockId: generic.blockId,
      BranchId: generic.branchId,
      Category: generic.category,
      CompanyId: generic.companyId,
      DateAssigned: new Date().toISOString(),
      DateWorked: new Date(generic.dateWorked).toISOString(),
      EmployeeId: table.id,
      FinancialYearId: generic.financialYearId,
      FloorId: generic.floorId,
      LoginTime: new Date(table.time_in).toISOString(),
      LogoutTime: new Date(table.time_out).toISOString(),
      OverTime: table.overtime,
      OverTimeAmount: 0,
      ProjectId: generic.projectId,
      Remarks: generic.remarks,
      UnitId: generic.unitId,
      Work: 1,
    }))
  }

  bindFormSelectOptions(){
    this.fetchFullEmployeeList()
    this.fetchCategorySelectOptions();
    this.loadWorkCategory()
    this.employeeGroup.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchLabourHeadSelectOptions(event.value)
    }

    const projectControllerFields: ProjectDivisionFields<BulkAttendanceEntry> = {
      projectDropdown: this.projectDropdown,
      blockDropdown: this.blockDropdown,
      floorDropdown: this.floorDropdown,
      unitDropdown: this.unitDropdown,
      model: this.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }

  fetchFullEmployeeList() {
    const companyId = this.authService.loggedInUser.companyId
    const branchId = this.authService.loggedInUser.branchId;

    const endPoint = `${EmployeeRegistrationMetadata.serviceEndPoint}/${companyId}/${branchId}`;

    this.dataHandler.get<IEmployee[]>(endPoint).subscribe((res: IEmployee[]) => {
        if (res && res.length) {
        this.employeeList = res;
      }
    });
  }

  fetchCategorySelectOptions(){
    const endPoint = `${LabourBulkAttendanceEntryMetadata.dropdownEndpoints.employeeCategory}`;
    this.dataHandler.get<IEmployeeCategory[]>(endPoint)
      .subscribe((res: IEmployeeCategory[]) => {
        if (res) {
          this.employeeCategory.templateOptions.options = res.map((e: IEmployeeCategory) => (
            {
              label: e.employeeCategoryName,
              value: e.employeeCategoryId
            }
          ));
          this.fetchLabourGroupSelectOptions();
        }
      });
  }

  fetchLabourGroupSelectOptions() {
    const categoryList = this.employeeCategory.templateOptions.options as IDropdown[];
    if(categoryList.length){
      const generatedList  = categoryList.filter(e => [1,2,3,4].includes(e.value));
      this.employeeGroup.templateOptions.options = generatedList;
    }
  }

  fetchLabourHeadSelectOptions(groupID: number) {
    const filteredList = this.employeeList.filter(e => e.employeeLabourGroupId == groupID);
    this.labourHeadList.templateOptions.options = filteredList.map((e: IEmployee) => (
      {
        label: e.fullName,
        value: e.id
      }
    ))
  }

  // loadWorkCategory() {
  //   const companyId = this.authService.loggedInUser.companyId
  //   const branchId = this.authService.loggedInUser.branchId;    
  //   this.dataHandler.get(`${AttendanceEntryMetadata.dropdownEndpoints.employeeWorkCategory}/${companyId}/${branchId}`)
  //     .subscribe((res: BasicWorkCategory[]) => {
  //         if (res) {
  //             this.workCategoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
  //                 {
  //                     label: e.workCategoryName,
  //                     value: e.id
  //                 }
  //             ));
  //         }
  //     });
  // }
  loadWorkCategory(){
    const companyId = this.authService.loggedInUser.companyId
    // const branchId = this.authService.loggedInUser.branchId; 
    const branchId = 0; 
    const endPoint = `${LabourBulkAttendanceEntryMetadata.dropdownEndpoints.employeeWorkCategory}/${companyId}/${branchId}`;
    this.dataHandler.get<BasicWorkCategory[]>(endPoint)
      .subscribe((res: BasicWorkCategory[]) => {
        if (res) {
          this.workCategoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
            {
              label: e.workCategoryName,
              value: e.id
            }
          ));
          this.fetchLabourGroupSelectOptions();
        }
      });
  }

  fetchAttendanceList(){
      this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
      const quueryData = {...this.model} as any;
      const endPoint = `${LabourBulkAttendanceEntryMetadata.dropdownEndpoints.employeeBasedAttendance}/${quueryData.projectId}/${quueryData.unitId}/${quueryData.blockId}/${quueryData.floorId}/${quueryData.category}`;
      this.dataHandler.get<BulkAttendanceEntry[]>(endPoint).subscribe((res: BulkAttendanceEntry[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onShowBtnClick(){
    this.displayEmployeeTable = true;
    if (this.form.valid) {
      this.fetchAttendanceList();
    }
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.payload
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<BulkAttendanceEntry> {
    if (this.isEdit) {
      return this.dataHandler.put<BulkAttendanceEntry>(LabourBulkAttendanceEntryMetadata.serviceEndPoint, this.payload);
    } else {
      delete this.model.id;
      return this.dataHandler.post<BulkAttendanceEntry>(LabourBulkAttendanceEntryMetadata.serviceEndPoint, this.payload);
    }
  }

  ngOnDestroy() {
    this.form.reset();
    this.projectDivisionFieldsHandler.clear();
  }

}
