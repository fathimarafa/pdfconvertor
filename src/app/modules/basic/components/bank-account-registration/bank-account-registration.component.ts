import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { BankAccount } from './definitions/bank-account-registration.definition';
import { BankAccountRegistrtaionMetadata } from './bank-account-registration.configuration';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-bank-account-registration',
  templateUrl: './bank-account-registration.component.html',
  styleUrls: ['./bank-account-registration.component.css']
})
export class BankAccountRegistrationComponent implements OnInit {

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
    this.module = BankAccountRegistrtaionMetadata;
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
    this.dataHandler.get<BankAccount[]>(this.serviceUrl)
      .subscribe((res: BankAccount[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  onAddEditBtnClick(rowToEdit?: BankAccount) {
    if (rowToEdit) {
      this.stateService.setState(this.module.moduleId, rowToEdit);
    }
    this.router.navigateByUrl('/home/addbankaccount');
  }

  openDeleteDialog(rowToDelete: BankAccount): void {
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

  private affectedRowIndex(affectedRow?: BankAccount) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: BankAccount) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}