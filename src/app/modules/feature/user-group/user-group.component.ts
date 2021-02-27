import { Component, OnInit, ViewChild } from '@angular/core';
import { UserGroupMetadata } from './user-group.configuration';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DataHandlerService } from '../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../services/dialog-event-handler/dialogeventhandler.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserGroupEditComponent } from './edit/user-group-edit.component';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';
import { UserGroup } from './definitions/user-group.definition';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = UserGroupMetadata;
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

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  fetchData() {
    this.dataHandler.get<UserGroup[]>(this.module.serviceEndPoint)
      .subscribe((res: UserGroup[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: UserGroup) {
    this.dialogEventHandler.openDialog(
      UserGroupEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: UserGroup): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.userGroupId}`,
      deleteUid: rowToDelete.userGroupId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(rowToEdit?: UserGroup): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: UserGroup) => row.userGroupId === rowToEdit.userGroupId);
    }
    return indexToUpdate;
  }

}
