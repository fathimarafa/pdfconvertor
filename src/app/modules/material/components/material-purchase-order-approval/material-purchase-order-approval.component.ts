import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialPurchaseOrderApprovalMetadata } from './material-purchase-order-approval.configuration';
import { MaterialIndentCreationMetadata } from '../material-indent-creation/material-indent-creation.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialPurchaseOrder } from '../material-purchase-order/definitions/material-purchase-order.definition';
import { MaterialPurchaseOrderMetadata } from '../material-purchase-order/material-purchase-order.configuration';

@Component({
  selector: 'app-material-purchase-order-approval',
  templateUrl: './material-purchase-order-approval.component.html',
  styleUrls: ['./material-purchase-order-approval.component.css']
})
export class MaterialPurchaseOrderApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  itemTableColumns;
  itemDatasource;
  selectedPurchaseOrder;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.module = MaterialPurchaseOrderApprovalMetadata;
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
    const endpoint = `${MaterialPurchaseOrderMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`
    this.dataHandler.get<MaterialPurchaseOrder[]>(endpoint)
      .subscribe((res: MaterialPurchaseOrder[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onApproveBtnClick() {
    if (!this.selectedPurchaseOrder) {
      this.snackBar.open('WARNING :  Please select a purchase order');
      return;
    }
    this.selectedPurchaseOrder.approvalLevel++;
    this.selectedPurchaseOrder.approvedBy = this.authService.loggedInUser.userId;
    this.selectedPurchaseOrder.approvedDate = new Date();
    this.dataHandler.put<MaterialPurchaseOrder>(MaterialIndentCreationMetadata.serviceEndPoint, [this.selectedPurchaseOrder]).subscribe((res) => {
      this.snackBar.open('Purchase Order Approved Successfully');
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedPurchaseOrder.id);
      if (rowToRemove !== -1) {
        this.dataSource.data.splice(rowToRemove, 1);
        this.dataSource._updateChangeSubscription();
        this.itemDatasource.data = [];
        this.itemDatasource._updateChangeSubscription();
      }
    })
  }

  onRejectBtnClick() {
    if (!this.selectedPurchaseOrder) {
      this.snackBar.open('WARNING :  Please select a purchase order');
      return;
    }
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  totalAmount = 0;
  onRowSelection(selectedPurchaseOrder: MaterialPurchaseOrder) {
    this.selectedPurchaseOrder = selectedPurchaseOrder;
    this.dataSource.data.forEach((row) => {
      row.id === selectedPurchaseOrder.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    selectedPurchaseOrder.purchaseOrderDetail.forEach(e =>{
      e['total'] = e.itemRate * e.quantityOrdered;
      this.totalAmount = this.totalAmount + e['total'];
    })
    this.itemDatasource = new MatTableDataSource(selectedPurchaseOrder.purchaseOrderDetail);
  }

}