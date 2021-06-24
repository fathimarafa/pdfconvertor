import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { ManualBoqEditComponent } from './edit/manual-boq-edit.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { ManualBOQMetadata } from './manual-boq.configuration';
import { ManualBOQ } from './definitions/manual-boq.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-manual-boq',
  templateUrl: './manual-boq.component.html',
  styleUrls: ['./manual-boq.component.css']
})
export class ManualBoqComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService
  ) {
    this.module = ManualBOQMetadata;
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
    this.dataHandler.get<ManualBOQ[]>(this.serviceUrl)
      .subscribe((res: ManualBOQ[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  openDialog(rowToEdit?: ManualBOQ) {
    this.dialogEventHandler.openDialog(
      ManualBoqEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }


  openDeleteDialog(rowToDelete: ManualBOQ): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.id}/${this.authService.loggedInUser.userId}`,
      deleteUid: rowToDelete.id
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(rowToEdit?: ManualBOQ): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: ManualBOQ) => row.id === rowToEdit.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}