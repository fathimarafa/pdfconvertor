import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { BasicSitemanagerTransaction } from '../../../basic/components/sitemanager-transaction/definitions/sitemanager-transaction.definition';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { BasicSitemanagerTransactionApprovalMetadata } from './sitemanager-transaction-approval.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BasicSitemanagerTransactionEditComponent } from '../../../basic/components/sitemanager-transaction/edit/basic-sitemanager-transaction-edit.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sitemanager-transaction-approval',
  templateUrl: './sitemanager-transaction-approval.component.html',
  styleUrls: ['./sitemanager-transaction-approval.component.css']
})
export class SitemanagerTransactionApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  selection = new SelectionModel<BasicSitemanagerTransaction>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.module = BasicSitemanagerTransactionApprovalMetadata;
    this.tableColumns = this.module.tableColumns
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      const columns = this.tableColumns.map(col => col.field);
      columns.push('select');
      return columns;
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataHandler.get<BasicSitemanagerTransaction[]>(this.serviceUrl)
      .subscribe((res: BasicSitemanagerTransaction[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selection.selected.length) {
      const message = 'WARNING : Please select an item';
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
    const subscriptionArray = this.selection.selected.map(selectedItem => {
      isApproved ? selectedItem.approvalLevel++ : selectedItem.approvalLevel--;
      selectedItem.approvedBy = this.authService.loggedInUser.userId;
      selectedItem.approvedDate = new Date().toISOString() as unknown as Date;
      return this.dataHandler.put<BasicSitemanagerTransaction>(this.module.serviceEndPoint, selectedItem)
    })
    forkJoin(subscriptionArray).subscribe((res) => {
      this.snackBar.open(`Sitemanager Transaction ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      this.selection.selected.forEach(item => {
        const rowToRemove = this.dataSource.data.findIndex(e => e.id === item.id);
        if (rowToRemove !== -1) {
          this.dataSource.data.splice(rowToRemove, 1);
        }
      })
      this.dataSource._updateChangeSubscription();
    })
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openEditDialog(rowToEdit?: BasicSitemanagerTransaction) {
    this.dialogEventHandler.openDialog(
      BasicSitemanagerTransactionEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: BasicSitemanagerTransaction) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: BasicSitemanagerTransaction) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  isAllSelected() {
    const totalSelected = this.selection.selected.length;
    const totalRows = this.dataSource.data.length;
    return totalSelected === totalRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


}