import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { SalaryHeadCreationMetadata } from './salary-head-creation.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { SalaryHeadCreationSetting } from './definitions/salary-head-creation-setting.definition';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { SalaryHeadCreationEditComponent } from './edit/salary-head-creation-edit.component';

@Component({
  selector: 'app-salary-head-creation',
  templateUrl: './salary-head-creation.component.html',
  styleUrls: ['./salary-head-creation.component.css']
})
export class SalaryHeadCreationComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = SalaryHeadCreationMetadata;
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
    this.dataHandler.get<SalaryHeadCreationSetting[]>(this.module.serviceEndPoint)
      .subscribe((res: SalaryHeadCreationSetting[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: SalaryHeadCreationSetting) {
    this.dialogEventHandler.openDialog(
      SalaryHeadCreationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: SalaryHeadCreationSetting): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.salaryHeadTypeId}`,
      deleteUid: rowToDelete.salaryHeadTypeId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: SalaryHeadCreationSetting) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: SalaryHeadCreationSetting) => row.salaryHeadTypeId === affectedRow.salaryHeadTypeId);
    }
    return indexToUpdate;
  }


}
