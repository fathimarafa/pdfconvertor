import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { LabourAttendanceEntryEditComponent } from './edit/labour-attendance-entry-edit.component';
import { LabourAttendanceEntryMetadata } from './labour-attendance-entry.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { AttendanceEntry } from './definitions/attendance.definition';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';

@Component({
  selector: 'app-labour-attendance-entry',
  templateUrl: './labour-attendance-entry.component.html',
  styleUrls: ['./labour-attendance-entry.component.css']
})
export class LabourAttendanceEntryComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = LabourAttendanceEntryMetadata;
    this.tableColumns = this.module.tableColumns
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }
  
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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
      LabourAttendanceEntryEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: AttendanceEntry): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.Id}`,
      deleteUid: rowToDelete.Id
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
      indexToUpdate = this.dataSource.data.findIndex((row: AttendanceEntry) => row.Id === affectedRow.Id);
    }
    return indexToUpdate;
  }

}