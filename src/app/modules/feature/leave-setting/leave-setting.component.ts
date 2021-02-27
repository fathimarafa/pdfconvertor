import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';
import { LeaveCreationMetadata } from './leave-setting.configuration';
import { DataHandlerService } from '../../../services/datahandler/datahandler.service';
import { LeaveSetting } from './definitions/leave-setting.definition';
import { DialogEventHandlerService } from '../../../services/dialog-event-handler/dialogeventhandler.service';
import { LeaveSettingEditComponent } from './edit/leave-setting-edit.component';

@Component({
  selector: 'app-leave-setting',
  templateUrl: './leave-setting.component.html',
  styleUrls: ['./leave-setting.component.css']
})
export class LeaveSettingComponent implements OnInit {
  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = LeaveCreationMetadata;
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
    this.dataHandler.get<LeaveSetting[]>(this.module.serviceEndPoint)
      .subscribe((res: LeaveSetting[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: LeaveSetting) {
    this.dialogEventHandler.openDialog(
      LeaveSettingEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: LeaveSetting): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.FinancialYearId}`,
      deleteUid: rowToDelete.FinancialYearId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: LeaveSetting) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: LeaveSetting) => row.FinancialYearId === affectedRow.FinancialYearId);
    }
    return indexToUpdate;
  }

}
