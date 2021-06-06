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
import { Router } from '@angular/router';
import { SideNavigationMenu } from 'src/app/modules/common/sidebar/sidebar.configuration';
import { MaterialStockEntryEditComponent } from '../material-stock-entry/edit/material-stock-entry-edit.component';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  selectedItem: MaterialStockEntry;
  totalAmount: number = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.module = MaterialStockEntryApprovalMetadata;
    this.module.displayName = this.isDirectEntry ? 'Material / Direct Stock Entry Approval' : 'Material / Stock Entry Approval';
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

  get isDirectEntry() {
    return this.router.url.includes('directstockentry');
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

  get menuId() {
    const urlHashArray = this.router.url.split('/');
    const endUrl = urlHashArray[urlHashArray.length - 1];
    for (let x in SideNavigationMenu) {
      if (SideNavigationMenu[x].route === `/${endUrl}`) {
        return SideNavigationMenu[x].menuId;
      }
    }
  }

  fetchData() {
    this.dataHandler.get<MaterialStockEntry[]>(this.serviceUrl)
      .subscribe((res: MaterialStockEntry[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    let user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selectedItem) {
      const message = 'WARNING : Please select an order';
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
    this.selectedItem.purchaseDetail = this.itemDatasource.data;
    this.dataHandler.put<MaterialStockEntry>(this.module.serviceEndPoint, [this.selectedItem]).subscribe((res) => {
      this.snackBar.open(`Stock Entry ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
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

  onRowSelection(selected: MaterialStockEntry) {
    this.selectedItem = selected;
    this.dataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    this.fetchDetails(selected);
  }

  fetchDetails(selected: MaterialStockEntry) {
    let endpoint = `BuildExeMaterial/api/PurchaseList/${selected.id}`;
    this.dataHandler.get(endpoint).subscribe((res: any[]) => {
      this.totalAmount = 0;
      res.forEach(e => {
        const total = e.quantity * e.rate;
        const tax = total * (e.tax / 100);
        const discount = total * (e.tax / 100);
        e.total = total + tax - discount;
        this.totalAmount = this.totalAmount + e.total;
      });
      this.itemDatasource = new MatTableDataSource(res);
    })
  }

  openEditDialog(rowToEdit?: MaterialStockEntry) {
    this.dialogEventHandler.openDialog(
      MaterialStockEntryEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: MaterialStockEntry) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialStockEntry) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }


}