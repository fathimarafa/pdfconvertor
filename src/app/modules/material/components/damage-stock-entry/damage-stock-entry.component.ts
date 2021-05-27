import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DamageStockEntryEditComponent } from './edit/damage-stock-entry-edit.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DamageStockEntry } from './definitions/damage-stock-entry.definition';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { DamageStockEntryMetadata } from './damage-stock-entry.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-damage-stock-entry',
  templateUrl: './damage-stock-entry.component.html',
  styleUrls: ['./damage-stock-entry.component.css']
})
export class DamageStockEntryComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService
  ) {
    this.module = DamageStockEntryMetadata;
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
    this.dataHandler.get<DamageStockEntry[]>(this.serviceUrl)
      .subscribe((res: DamageStockEntry[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  openDialog(rowToEdit?: DamageStockEntry) {
    this.dialogEventHandler.openDialog(
      DamageStockEntryEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }


  openDeleteDialog(rowToDelete: DamageStockEntry): void {
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

  private affectedRowIndex(rowToEdit?: DamageStockEntry): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: DamageStockEntry) => row.id === rowToEdit.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}