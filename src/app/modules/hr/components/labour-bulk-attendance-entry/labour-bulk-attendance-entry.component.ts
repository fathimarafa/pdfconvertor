import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { LabourBulkAttendanceEntryEditComponent } from './edit/labour-bulk-attendance-entry-edit.component';
import { LabourBulkAttendanceEntryMetadata } from './labour-bulk-attendance-entry.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { BulkAttendanceEntry } from './definitions/attendance-monthly.definition';

@Component({
  selector: 'app-labour-bulk-attendance-entry',
  templateUrl: './labour-bulk-attendance-entry.component.html',
  styleUrls: ['./labour-bulk-attendance-entry.component.css']
})
export class LabourBulkAttendanceEntryComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = LabourBulkAttendanceEntryMetadata;
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
    this.dataHandler.get<BulkAttendanceEntry[]>(this.module.serviceEndPoint)
      .subscribe((res: BulkAttendanceEntry[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: BulkAttendanceEntry) {
    this.dialogEventHandler.openDialog(
      LabourBulkAttendanceEntryEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: BulkAttendanceEntry): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.id}`,
      deleteUid: rowToDelete.id
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: BulkAttendanceEntry) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: BulkAttendanceEntry) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

}