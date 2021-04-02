import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { BasicSitemanagerTransaction } from './definitions/sitemanager-transaction.definition';
import { BasicSitemanagerTransactionMetadata } from './basic-sitemanager-transaction.configuration';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';

@Component({
  selector: 'app-basic-sitemanager-transaction',
  templateUrl: './basic-sitemanager-transaction.component.html',
  styleUrls: ['./basic-sitemanager-transaction.component.css']
})
export class BasicSitemanagerTransactionComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private router: Router,
    private stateService: AppStateService
  ) {
    this.module = BasicSitemanagerTransactionMetadata;
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
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<BasicSitemanagerTransaction[]>(`${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: BasicSitemanagerTransaction[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onAddEditBtnClick(rowToEdit?: BasicSitemanagerTransaction) {
    if (rowToEdit) {
      this.stateService.setState(this.module.moduleId, rowToEdit);
    }
    this.router.navigateByUrl('/home/addsitemanagertransaction');
  }

  openDeleteDialog(rowToDelete: BasicSitemanagerTransaction): void {
    const dummyUserId = 1;
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.id}/${dummyUserId}`,
      deleteUid: rowToDelete.id
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: BasicSitemanagerTransaction) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: BasicSitemanagerTransaction) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}