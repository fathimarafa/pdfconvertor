import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DamageStockEntryApprovalMetadata } from './damage-stock-entry-approval.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DamageStockEntry } from '../damage-stock-entry/definitions/damage-stock-entry.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-damage-stock-entry-approval',
  templateUrl: './damage-stock-entry-approval.component.html',
  styleUrls: ['./damage-stock-entry-approval.component.css']
})
export class DamageStockEntryApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  projectStatusTypes;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.module = DamageStockEntryApprovalMetadata;
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

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() { }

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

  onApproveBtnClick(selectedRow?: DamageStockEntry) {
    selectedRow.approvalStatus = 1;
    selectedRow.approvalLevel++;
    selectedRow.approvedBy = this.authService.loggedInUser.userId
    this.dataHandler.put<DamageStockEntry[]>(this.module.serviceEndPoint, selectedRow)
      .subscribe((res: DamageStockEntry[]) => {
        this.snackBar.open('Data Saved Successfully');
        const rowToDelete = this.dataSource.data.findIndex(e => e.id === selectedRow.id);
        if (rowToDelete !== -1) {
          this.dataSource.data.splice(rowToDelete, 1);
          this.dataSource._updateChangeSubscription();
        }
      })
  }


}
