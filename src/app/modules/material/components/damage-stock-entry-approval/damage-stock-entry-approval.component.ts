import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DamageStockEntryApprovalMetadata } from './damage-stock-entry-approval.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DamageStockEntry } from '../damage-stock-entry/definitions/damage-stock-entry.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { DamageStockEntryEditComponent } from '../damage-stock-entry/edit/damage-stock-entry-edit.component';

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
  selectedItem: DamageStockEntry;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private dialogEventHandler: DialogEventHandlerService,
  ) {
    this.module = DamageStockEntryApprovalMetadata;
    this.tableColumns = this.module.tableColumns;
    this.fetchData();
  }

  ngOnInit() { }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  fetchData() {
    this.dataHandler.get<DamageStockEntry[]>(this.serviceUrl)
      .subscribe((res: DamageStockEntry[]) => {
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
      const message = 'WARNING : Please select a stock entry';
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

  onApproveBtnClick(item: DamageStockEntry) {
    this.selectedItem = item;
    const isApproved = true;
    this.openApproveRemarkDialog(isApproved);
  }

  onRejectBtnClick(item: DamageStockEntry) {
    this.selectedItem = item;
    const isApproved = false;
    this.openApproveRemarkDialog(isApproved);
  }

  saveChanges(isApproved: boolean) {
    if (isApproved) {
      this.selectedItem.approvalLevel++;
      this.selectedItem.approvedBy = this.authService.loggedInUser.userId;
    } else {
      this.selectedItem.approvalLevel--;
    }
    this.dataHandler.put<DamageStockEntry>(this.module.serviceEndPoint, this.selectedItem).subscribe((res) => {
      this.snackBar.open(`Damaged stock entry ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedItem.id);
      if (rowToRemove !== -1) {
        this.dataSource.data.splice(rowToRemove, 1);
        this.dataSource._updateChangeSubscription();
      }
    })
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openEditDialog(rowToEdit?: DamageStockEntry) {
    this.dialogEventHandler.openDialog(
      DamageStockEntryEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: DamageStockEntry) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: DamageStockEntry) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }



}
