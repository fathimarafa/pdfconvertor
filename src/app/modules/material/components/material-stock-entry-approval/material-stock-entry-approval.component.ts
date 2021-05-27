import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialStockEntryApprovalMetadata } from './material-stock-entry-approval.configuration';
import { MaterialIndent } from '../material-indent-creation/definitions/material-indent-creation.definiton';
import { MaterialIndentCreationMetadata } from '../material-indent-creation/material-indent-creation.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialStockEntry } from '../material-stock-entry/definitions/material-stock-entry.definition';

@Component({
  selector: 'app-material-stock-entry-approval',
  templateUrl: './material-stock-entry-approval.component.html',
  styleUrls: ['./material-stock-entry-approval.component.css']
})
export class MaterialStockEntryApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  itemTableColumns;
  itemDatasource;
  selection: MaterialStockEntry;
  totalAmount: number = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.module = MaterialStockEntryApprovalMetadata;
    this.tableColumns = this.module.tableColumns
    this.itemTableColumns = this.module.itemDetailstableColumns;
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  get itemDataColumns() {
    if (this.itemTableColumns && this.itemTableColumns.length) {
      return this.itemTableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const user = this.authService.loggedInUser;
    const endpoint = `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`
    this.dataHandler.get<MaterialStockEntry[]>(endpoint)
      .subscribe((res: MaterialStockEntry[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onApproveBtnClick() {
    if (!this.selection) {
      this.snackBar.open('WARNING :  Please select a stock entry');
      return;
    }
    this.selection.approvalLevel++;
    this.selection.approvedBy = this.authService.loggedInUser.userId;
    this.selection.approvedDate = new Date();
    this.dataHandler.put<MaterialIndent>(MaterialIndentCreationMetadata.serviceEndPoint, [this.selection]).subscribe((res) => {
      this.snackBar.open('Stock Entry Approved Successfully');
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selection.id);
      if (rowToRemove !== -1) {
        this.dataSource.data.splice(rowToRemove, 1);
        this.dataSource._updateChangeSubscription();
        this.itemDatasource.data = [];
        this.itemDatasource._updateChangeSubscription();
      }
    })
  }

  onRejectBtnClick() {
    if (!this.selection) {
      this.snackBar.open('WARNING :  Please select a stock entry');
      return;
    }
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onRowSelection(selected: MaterialStockEntry) {
    this.selection = selected;
    this.dataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    selected.purchaseDetail.forEach(e => {
      e['total'] = e.quantity * e.rate;
      this.totalAmount = this.totalAmount + e['total'];
    })
    this.itemDatasource = new MatTableDataSource(selected.purchaseDetail);
  }

}