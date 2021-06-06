import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialPurchaseReturnApprovalMetadata } from './material-purchase-return-approval.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialPurchaseReturn } from '../material-purchase-return/definitions/material-purchase-return.definition';
import { MatDialog } from '@angular/material/dialog';
import { MaterialPurchaseReturnEditComponent } from '../material-purchase-return/edit/material-purchase-return-edit.component';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';


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
  selectedItem: MaterialPurchaseReturn;
  totalAmount = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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
    this.dataHandler.get<MaterialPurchaseReturn[]>(this.approvalServiceUrl)
      .subscribe((res: MaterialPurchaseReturn[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get approvalServiceUrl() {
    let user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selectedItem) {
      const message = 'WARNING : Please select a purchase return order';
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

  onApproveBtnClick() {
    const isApproved = true;
    this.openApproveRemarkDialog(isApproved);
  }

  onRejectBtnClick() {
    const isApproved = false;
    this.openApproveRemarkDialog(isApproved);
  }

  saveChanges(isApproved: boolean) {
    if (isApproved) {
      this.selectedItem.approvalLevel++;
      this.selectedItem.approvedBy = this.authService.loggedInUser.userId;
      this.selectedItem.approvedDate = new Date();
    } else {
      this.selectedItem.approvalLevel--;
    }
    this.selectedItem.purchaseReturnDetail = this.itemDatasource.data;
    this.dataHandler.put<MaterialPurchaseReturn>(this.module.serviceEndPoint, [this.selectedItem]).subscribe((res) => {
      this.snackBar.open(`Purchase Return Order ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedItem.id);
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

  onRowSelection(selectedItem: MaterialPurchaseReturn) {
    this.selectedItem = selectedItem;
    this.dataSource.data.forEach((row) => {
      row.id === selectedItem.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    this.fetchDetails();
  }

  fetchDetails() {
    let endpoint = `${this.module.serviceEndPoint}List/${this.selectedItem.id}`;
    this.dataHandler.get(endpoint).subscribe((res: any[]) => {
      this.totalAmount = 0;
      res.forEach((e) => {
        const total = e.quantity * e.rate;
        const tax = total * (e.tax / 100);
        const discount = total * ((e.discount || e.disount) / 100);
        e.total = total + tax - discount;
        this.totalAmount = this.totalAmount + e.total;
      });
      this.itemDatasource = new MatTableDataSource(res);
    })
  }

  openEditDialog(rowToEdit?: MaterialPurchaseReturn) {
    this.dialogEventHandler.openDialog(
      MaterialPurchaseReturnEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: MaterialPurchaseReturn) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialPurchaseReturn) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }


}