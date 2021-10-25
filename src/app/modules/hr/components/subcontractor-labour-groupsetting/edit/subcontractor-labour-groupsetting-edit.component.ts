import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { AttendanceSettingDetails, Subcontractorlabourgroup } from '../definitions/subcontractor-labour-groupsetting.definition';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';
import { SubcontractorlaboutgroupMetadata } from '../subcontractor-labour-groupsetting.configuration';
import { PrebudgetWorkTypeMetadata } from 'src/app/modules/prebudget/components/work-type/work-type.configuration';
import { PrebudgetWorkType } from 'src/app/modules/prebudget/components/work-type/definitions/work-type.definition';
import { LabourWorkRateSettingMetadata } from '../../labour-workrate-setting/labour-workrate-setting.configuration';
import { LabourWorkRate } from '../../labour-workrate-setting/definitions/labour-workrate-setting.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { Router } from '@angular/router';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-subcontractor-labour-groupsetting-edit',
  templateUrl: './subcontractor-labour-groupsetting-edit.component.html',
  styleUrls: ['./subcontractor-labour-groupsetting-edit.component.css']
})
export class SubcontractorlabourgroupEditComponent implements OnInit {


  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  isUpdatingUnit: boolean;
  model: Subcontractorlabourgroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<SubcontractorlabourgroupEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: Subcontractorlabourgroup,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.loadDropdowns();
  }


  loadItemDetails() {
    if (this.isEdit) {
        const endpoint = `${SubcontractorlaboutgroupMetadata.serviceEndPoint}List/${this.editData.id}`;
        this.dataHandler.get(endpoint).subscribe((res: any[]) => {
            this.dataSource = new MatTableDataSource(res)
        });
    } else {
        this.dataSource = new MatTableDataSource([]);
    }
}

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<AttendanceSettingDetails> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.issued.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);

  }

  ngOnInit(): void {
    this.tableColumns = SubcontractorlaboutgroupMetadata.attendanceSettingDetails.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: SubcontractorlaboutgroupMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: SubcontractorlaboutgroupMetadata.attendanceSettingDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.loadItemDetails();
    this.dataSource = new MatTableDataSource(this.editData.attendanceSettingDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchWorkCategorySelectOptions();
    this.fetchSubcontractorSelectOptions();
    this.fetchWorkNameSelectOptions();
    this.bindProjectDivisionFields();
  }

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
    if (this.modalForms.issued.form.valid) {
      if (this.isEditedFromApproval) {
        this.openApproveDialog();
      } else {
        if (nextLevel) {
          this.modalForms.issued.model.approvedDate = new Date();
          this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
          this.modalForms.issued.model.approvalLevel = 1;
        }
        this.saveChanges();
      }
    }
  }

  saveChanges() {
    this.httpRequest.subscribe((res) => {
      const closeEvent: IDialogEvent = {
        action: this.isEdit ? DialogActions.edit : DialogActions.add,
        data: res || this.modalForms.issued.model
      }
      this.dialogRef.close(closeEvent);
    })
  }


  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<Subcontractorlabourgroup> {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    let payload: any = this.modalForms.issued.model
    payload.attendanceSettingDetails = this.dataSource.data;
    
    if (this.isEdit) {
      return this.dataHandler.put<Subcontractorlabourgroup>(SubcontractorlaboutgroupMetadata.serviceEndPoint, [payload]);
    } else {
      payload.isDeleted = 0;
      return this.dataHandler.post<Subcontractorlabourgroup>(SubcontractorlaboutgroupMetadata.serviceEndPoint, [payload]);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  // onAddStockBtnClick() {
  //   if (this.isValid) {
  //     const data: any = Object.assign({}, this.modalForms.usage.model);
  //     data.labourWorkName = this.WorknameDataset.find(e => e.id === data.labourWorkId).labourWorkName;
  //     this.dataSource.data.push(data);
  //     this.dataSource._updateChangeSubscription();
  //     this.modalForms.usage.form.reset();
  //   }
  // }

  onAddUnitsBtnClick() {
    if(this.modalForms.usage.form.valid){
      if (this.isUpdatingUnit) {
        const indexToUpdate = this.dataSource.data.findIndex(row => row.id === this.modalForms.usage.model.id);
        if (indexToUpdate !== -1) {
          this.dataSource.data[indexToUpdate] = Object.assign({}, this.modalForms.usage.model);
          this.isUpdatingUnit = false;
        }
      } else {
        const data: any = Object.assign(
            { id: `temp-${this.dataSource.data.length + 1}` },
            this.modalForms.usage.model);
       data.labourWorkName = this.WorknameDataset.find(e => e.id === data.labourWorkId).labourWorkName;
       this.dataSource.data.push(data);
      }
      this.dataSource._updateChangeSubscription();
      this.modalForms.usage.form.reset();
    //   this.bindUnitDefaultValues();
    }
  }


  get isValid() {
    if (!this.modalForms.usage.model['labourWorkId']) {
      this.snackBar.open('Warning : Please select Work Name', null, { panelClass: 'snackbar-error-message' });
      return false;
    }
    if (!this.modalForms.usage.model['workRate']) {
      this.snackBar.open('Warning : Please input Work Rate', null, { panelClass: 'snackbar-error-message' });
      return false;
    }
    return true;
  }


  fetchWorkCategorySelectOptions() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    const endPoint = `${PrebudgetWorkTypeMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`;
    this.dataHandler.get<PrebudgetWorkType[]>(endPoint)
      .subscribe((res: PrebudgetWorkType[]) => {
        if (res) {
          FormfieldHandler.workcategoryDropdown.templateOptions.options = res.map((e: PrebudgetWorkType) => (
            {
              label: e.workTypeName,
              value: e.id
            }
          ));
        }
      });
  }


  // fetchWorkNameSelectOptions() {
  //   this.dataHandler.get<LabourWorkRate[]>(this.worknameServiceUrl)
  //     .subscribe((res: LabourWorkRate[]) => {
  //       if (res) {
  //         FormfieldHandler.worknameDropdown.templateOptions.options = res.map((e: LabourWorkRate) => (
  //           {
  //             label: e.labourWorkName,
  //             value: e.id
  //           }
  //         ));
  //       }
  //     });
  // }

  // get worknameServiceUrl() {
  //   const user = this.authService.loggedInUser;
  //   return `${LabourWorkRateSettingMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  // }

  
  WorknameDataset: LabourWorkRate[];
  private fetchWorkNameSelectOptions() {
    this.dataHandler.get<LabourWorkRate[]>(this.labourWorkrateSerivceUrl).subscribe((res: LabourWorkRate[]) => {
      if (res) {
        this.WorknameDataset=res;
                FormfieldHandler.worknameDropdown.templateOptions.options = res.map((e: LabourWorkRate) => (
                  {
                   label: e.labourWorkName,
                   value: e.id
                  }
              ));
        this.listenworknameChange();
      }
    });
  }

  listenworknameChange() {
    FormfieldHandler.worknameDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      const selectedworkname: LabourWorkRate = this.WorknameDataset.find(e => e.id === this.modalForms.usage.model.labourWorkId)
      if (selectedworkname) {
        this.modalForms.usage.model.workRate= selectedworkname.rate;
        this.modalForms.usage.model = { ...this.modalForms.usage.model};
        console.log("",this.modalForms.usage.model['workRate']);
      }
    }

  }

  private get labourWorkrateSerivceUrl() {
    const user = this.authService.loggedInUser;
    const specid=2;
    return `${LabourWorkRateSettingMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}/${specid}`;
  }


  private fetchSubcontractorSelectOptions() {
    this.employeeService.getSubContractor().subscribe((res) => {
      if (res) {
        FormfieldHandler.subcontractorDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.id
          }
        ));
      }
    });
  }

  onDeleteRowBtnClick(selectedRow) {
    const indexToRemove = this.dataSource.data.findIndex(row => row.id === selectedRow.id);
    if (indexToRemove !== -1) {
      this.dataSource.data.splice(indexToRemove, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  onEditRow(row) {
    this.modalForms.usage.model = Object.assign({}, row);
    this.isUpdatingUnit = true;
  }

  onUpdateStockBtnClick() {

  }

  onCancelStockUpdateBtnClick() {

  }

  ngOnDestroy() {
    this.modalForms.issued.form.reset();
    this.modalForms.usage.form.reset();
    this.projectDivisionFieldsHandler.clear();
  }

}