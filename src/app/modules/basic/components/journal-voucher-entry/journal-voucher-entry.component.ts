import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { Journal } from './definitions/journal-voucher-entry.definition';
import { JournalVoucherEntryMetadata } from './journal-voucher-entry.configuration';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-journal-voucher-entry',
  templateUrl: './journal-voucher-entry.component.html',
  styleUrls: ['./journal-voucher-entry.component.css']
})
export class JournalVoucherEntryComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private router: Router,
    private stateService: AppStateService,
    private authService: AuthenticationService
  ) {
    this.module = JournalVoucherEntryMetadata;
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
    this.dataHandler.get<Journal[]>(this.serviceUrl)
      .subscribe((res: Journal[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  onAddEditBtnClick(rowToEdit?: Journal) {
    if (rowToEdit) {
      this.stateService.setState(this.module.moduleId, rowToEdit);
    }
    this.router.navigateByUrl('/home/addjournal');
  }

  openDeleteDialog(rowToDelete: Journal): void {
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

  private affectedRowIndex(affectedRow?: Journal) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: Journal) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}