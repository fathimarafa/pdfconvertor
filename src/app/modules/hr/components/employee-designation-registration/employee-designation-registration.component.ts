import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { EmployeeDesignationRegistrationEditComponent } from './edit/employee-designation-registration-edit.component';
import { EmployeeDesignationRegistrationMetadata } from './employee-designation-registration.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { EmployeeDesignationRegistration } from './definitions/employee-designation.definition';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';

@Component({
  selector: 'app-employee-designation-registration',
  templateUrl: './employee-designation-registration.component.html',
  styleUrls: ['./employee-designation-registration.component.css']
})
export class EmployeeDesignationRegistrationComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = EmployeeDesignationRegistrationMetadata;
    this.tableColumns = this.module.tableColumns
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<EmployeeDesignationRegistration[]>(`${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: EmployeeDesignationRegistration[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: EmployeeDesignationRegistration) {
    this.dialogEventHandler.openDialog(
      EmployeeDesignationRegistrationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: EmployeeDesignationRegistration): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.employeeDesignationId}`,
      deleteUid: rowToDelete.employeeDesignationId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: EmployeeDesignationRegistration) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: EmployeeDesignationRegistration) => row.employeeDesignationId === affectedRow.employeeDesignationId);
    }
    return indexToUpdate;
  }

}