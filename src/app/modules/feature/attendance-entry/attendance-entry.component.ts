import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';
import { AttendanceEntryEditComponent } from './edit/attendance-entry-edit.component';
import { AttendanceEntryMetadata } from './attendance-entry.configuration';
import { DataHandlerService } from '../../../services/datahandler/datahandler.service';
import { AttendanceEntry } from './definitions/attendance.definition';
import { DialogEventHandlerService } from '../../../services/dialog-event-handler/dialogeventhandler.service';

@Component({
  selector: 'app-attendance-entry',
  templateUrl: './attendance-entry.component.html',
  styleUrls: ['./attendance-entry.component.css']
})
export class AttendanceEntryComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = AttendanceEntryMetadata;
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
    this.dataHandler.get<AttendanceEntry[]>(this.module.serviceEndPoint)
      .subscribe((res: AttendanceEntry[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: AttendanceEntry) {
    this.dialogEventHandler.openDialog(
      AttendanceEntryEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: AttendanceEntry): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.attendanceId}`,
      deleteUid: rowToDelete.attendanceId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: AttendanceEntry) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: AttendanceEntry) => row.attendanceId === affectedRow.attendanceId);
    }
    return indexToUpdate;
  }

}