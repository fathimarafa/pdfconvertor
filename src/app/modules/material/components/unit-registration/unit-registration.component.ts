import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { UnitRegistration } from './definitions/unit-registration.definition';
import { UnitRegistrationEditComponent } from './edit/unit-registration-edit.component';
import { UnitRegistrationMetadata } from './unit-registration.configuration';

@Component({
  selector: 'app-unit-registration',
  templateUrl: './unit-registration.component.html',
  styleUrls: ['./unit-registration.component.css']
})
export class UnitRegistrationComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = UnitRegistrationMetadata;
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
    const endPoint = `${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`;
    this.dataHandler.get<UnitRegistration[]>(endPoint)
      .subscribe((res: UnitRegistration[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: UnitRegistration) {
    this.dialogEventHandler.openDialog(
      UnitRegistrationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: UnitRegistration): void {
    const dummyUserId = 1;
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.unitId}/${dummyUserId}`,
      deleteUid: rowToDelete.unitId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: UnitRegistration) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: UnitRegistration) => row.unitId === affectedRow.unitId);
    }
    return indexToUpdate;
  }
  
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}