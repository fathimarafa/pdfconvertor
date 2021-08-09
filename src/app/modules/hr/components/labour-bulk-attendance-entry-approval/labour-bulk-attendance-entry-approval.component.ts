import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { LabourBulkAttendanceEntryApprovalMetadata } from './labour-bulk-attendance-entry-approval.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LabourBulkAttendanceEntryEditComponent } from '../labour-bulk-attendance-entry/edit/labour-bulk-attendance-entry-edit.component';
import { forkJoin } from 'rxjs';
import { BulkAttendanceEntry } from '../labour-bulk-attendance-entry/definitions/attendance-monthly.definition';

@Component({
  selector: 'app-labour-bulk-attendance-entry-approval',
  templateUrl: './labour-bulk-attendance-entry-approval.component.html',
  styleUrls: ['./labour-bulk-attendance-entry-approval.component.css']
})
export class LabourBulkAttendanceEntryApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  selection = new SelectionModel<BulkAttendanceEntry>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.module = LabourBulkAttendanceEntryApprovalMetadata;
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
    this.dataHandler.get<BulkAttendanceEntry[]>(this.serviceUrl)
      .subscribe((res: BulkAttendanceEntry[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    const menuid = 1;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}/${menuid}`;
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
      return this.dataHandler.put<BulkAttendanceEntry>(this.module.serviceEndPoint, [selectedItem])
    });
    forkJoin(subscriptionArray).subscribe((res) => {
      this.snackBar.open(`Attendance ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
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

  openEditDialog(rowToEdit?: BulkAttendanceEntry) {
    this.dialogEventHandler.openDialog(
      LabourBulkAttendanceEntryEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: BulkAttendanceEntry) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: BulkAttendanceEntry) => row.id === affectedRow.id);
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