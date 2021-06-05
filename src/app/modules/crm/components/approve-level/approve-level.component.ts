import { Component, OnInit, ViewChild } from '@angular/core';
import { ApproveLevelEditComponent } from './edit/approve-level-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { ApproveLevelMetadata } from './approve-level.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { ApproveLevel } from './definitions/approvelevel.definition';

@Component({
  selector: 'app-approve-level',
  templateUrl: './approve-level.component.html',
  styleUrls: ['./approve-level.component.css']
})
export class ApproveLevelComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = ApproveLevelMetadata;
    this.tableColumns = this.module.tableColumns;
    this.fetchData();
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() { }

  fetchData() {
    this.dataHandler.get<ApproveLevel[]>(this.module.serviceEndPoint)
      .subscribe((res: ApproveLevel[]) => {
        let obj = {};
        res.forEach(e => {
          if (!obj[e.menuId]) {
            obj[e.menuId] = {
              menuId: e.menuId,
              teamId: e.teamId,
              user: []
            }
          }
          obj[e.menuId].user.push({
            userId: e.userid,
            formlevel: e.formlevel
          })
        })
        this.dataSource = new MatTableDataSource(Object.values(obj));
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: ApproveLevel) {
    this.dialogEventHandler.openDialog(
      ApproveLevelEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: ApproveLevel): void {
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

  private affectedRowIndex(affectedRow?: ApproveLevel) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: ApproveLevel) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
