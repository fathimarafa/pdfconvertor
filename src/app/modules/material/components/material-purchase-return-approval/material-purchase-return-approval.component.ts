import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialPurchaseReturnApprovalMetadata } from './material-purchase-return-approval.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialPurchaseReturn } from '../material-purchase-return/definitions/material-purchase-return.definition';


@Component({
  selector: 'app-material-purchase-return-approval',
  templateUrl: './material-purchase-return-approval.component.html',
  styleUrls: ['./material-purchase-return-approval.component.css']
})
export class MaterialPurchaseReturnApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  itemTableColumns;
  itemDatasource;
  selected: MaterialPurchaseReturn;
  totalAmount = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.module = MaterialPurchaseReturnApprovalMetadata;
    this.tableColumns = this.module.tableColumns
    this.itemTableColumns = this.module.itemDetailstableColumns;
    this.fetchData();
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

  ngOnInit() { }

  fetchData() {
    this.dataHandler.get<MaterialPurchaseReturn[]>(this.serviceUrl)
      .subscribe((res: MaterialPurchaseReturn[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }


  onApproveBtnClick() {
    if (!this.selected) {
      this.snackBar.open('WARNING :  Please select a purchase return');
      return;
    }
    this.selected.approvalLevel++;
    this.selected.approvedBy = this.authService.loggedInUser.userId;
    this.selected.approvedDate = new Date();
    this.dataHandler.put<MaterialPurchaseReturn>(this.module.serviceEndPoint, [this.selected]).subscribe((res) => {
      this.snackBar.open('Material Purchase Return Approved Successfully');
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selected.id);
      if (rowToRemove !== -1) {
        this.dataSource.data.splice(rowToRemove, 1);
        this.dataSource._updateChangeSubscription();
        this.itemDatasource.data = [];
        this.itemDatasource._updateChangeSubscription();
      }
    })
  }

  onRejectBtnClick() {
    if (!this.selected) {
      this.snackBar.open('WARNING :  Please select a purchase return');
      return;
    }
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  onRowSelection(selected: MaterialPurchaseReturn) {
    this.selected = selected;
    this.dataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    selected.purchaseReturnDetail.forEach(e => {
      e['total'] = e.quantity * e.rate;
      this.totalAmount = this.totalAmount + e['total'];
    })
    this.itemDatasource = new MatTableDataSource(selected.purchaseReturnDetail);
  }

}