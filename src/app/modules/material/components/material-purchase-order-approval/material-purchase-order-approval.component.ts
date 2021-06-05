import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialPurchaseOrderApprovalMetadata } from './material-purchase-order-approval.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialPurchaseOrder } from '../material-purchase-order/definitions/material-purchase-order.definition';
import { MaterialPurchaseOrderEditComponent } from '../material-purchase-order/edit/material-purchase-order-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { MaterialPurchaseOrderMetadata } from '../material-purchase-order/material-purchase-order.configuration';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private stateService: AppStateService
  ) {
    this.module = MaterialPurchaseOrderApprovalMetadata;
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
    this.dataHandler.get<MaterialPurchaseOrder[]>(this.serviceUrl)
      .subscribe((res: MaterialPurchaseOrder[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    let user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
  }

  onApproveBtnClick() {
    const isApproved = true;
    this.openApproveRemarkDialog(isApproved)
  }

  onRejectBtnClick() {
    const isApproved = false;
    this.openApproveRemarkDialog(isApproved)
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selectedPurchaseOrder) {
      const message = 'WARNING : Please select a purchase order';
      this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
      return;
    }
    const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveChanges(isApproved);
      }
    });
  }

  saveChanges(isApproved: boolean) {
    if (!this.selectedPurchaseOrder) {
      const message = 'WARNING : Please select a purchase order';
      this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
      return;
    }
    if (isApproved) {
      this.selectedPurchaseOrder.approvalLevel++;
      this.selectedPurchaseOrder.approvedBy = this.authService.loggedInUser.userId;
      this.selectedPurchaseOrder.approvedDate = new Date();
    } else {
      this.selectedPurchaseOrder.approvalLevel--;
    }
    this.selectedPurchaseOrder.purchaseOrderDetail = this.itemDatasource.data;
    this.dataHandler.put<MaterialPurchaseOrder>(this.module.serviceEndPoint, [this.selectedPurchaseOrder]).subscribe((res) => {
      this.snackBar.open(`Purchase Order ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedPurchaseOrder.id);
      if (rowToRemove !== -1) {
        this.dataSource.data.splice(rowToRemove, 1);
        this.dataSource._updateChangeSubscription();
        this.itemDatasource.data = [];
        this.itemDatasource._updateChangeSubscription();
      }
    })
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
    this.fetchDetails();
  }

  fetchDetails() {
    let endpoint = `${this.module.serviceEndPoint}List/${this.selectedPurchaseOrder.id}`;
    this.dataHandler.get(endpoint).subscribe((res: any[]) => {
      this.totalAmount = 0;
      res.forEach(e => {
        const total = e.itemRate * e.quantityOrdered;
        const tax = total * (e.tax / 100);
        e['total'] = total + tax;
        this.totalAmount = this.totalAmount + e['total'];
      })
      this.totalAmount = Number(this.totalAmount.toFixed(2));
      this.itemDatasource = new MatTableDataSource(res);
    })
  }

  openEditDialog(rowToEdit?: MaterialPurchaseOrder) {
    this.dialogEventHandler.openDialog(
      MaterialPurchaseOrderEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: MaterialPurchaseOrder) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialPurchaseOrder) => row.id === affectedRow.id);
      this.stateService.setState(MaterialPurchaseOrderMetadata.moduleId, affectedRow);
    }
    return indexToUpdate;
  }


}