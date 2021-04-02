import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { WorkingHoursSettingEditComponent } from './edit/working-hours-setting-edit.component';
import { WorkingHoursSettingMetadata } from './working-hours-setting.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { WorkingHoursSetting } from './definitions/working-hours-setting.definition';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';

@Component({
  selector: 'app-working-hours-setting',
  templateUrl: './working-hours-setting.component.html',
  styleUrls: ['./working-hours-setting.component.css']
})
export class WorkingHoursSettingComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = WorkingHoursSettingMetadata;
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
    this.dataHandler.get<WorkingHoursSetting[]>(this.module.serviceEndPoint)
      .subscribe((res: WorkingHoursSetting[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: WorkingHoursSetting) {
    this.dialogEventHandler.openDialog(
      WorkingHoursSettingEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: WorkingHoursSetting): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.workingHoursSettingId}`,
      deleteUid: rowToDelete.workingHoursSettingId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: WorkingHoursSetting) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: WorkingHoursSetting) => row.workingHoursSettingId === affectedRow.workingHoursSettingId);
    }
    return indexToUpdate;
  }

}