import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SubconntractorattendanceApprovalMetadata } from './subcontractor-labourgroupattendance-approval.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubcontractorlabourgroupaAttendance } from '../subcontractor-labour-groupattendancesetting/definitions/subcontractor-labour-groupattendancesetting.definition';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { ConfirmModalComponent } from 'src/app/modules/common/confirm-modal/confirm-modal.component';
import { SubcontractorlabourgroupattendanceEditComponent } from '../subcontractor-labour-groupattendancesetting/edit/subcontractor-labour-groupattendancesetting-edit.component';
import { SubcontractorlaboutgroupattendanceMetadata } from '../subcontractor-labour-groupattendancesetting/subcontractor-labour-groupattendancesetting.configuration';
import { MatDialog } from '@angular/material/dialog';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { SubcontractorlabourgroupattendanceapprovalEditComponent } from './edit/subcontractor-labour-groupattendancesetting-approval-edit.component';

@Component({
  selector: 'app-subcontractor-labourgroupattendance-approval',
  templateUrl: './subcontractor-labourgroupattendance-approval.component.html',
  styleUrls: ['./subcontractor-labourgroupattendance-approval.component.css']
})
export class SubcontractorattendanceApprovalComponent implements OnInit {

 

module;
tableColumns;
dataSource;
itemTableColumns;
itemDatasource;
selectedworkorder;

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

constructor(
  private dataHandler: DataHandlerService,
  private dialogEventHandler: DialogEventHandlerService,
  private authService: AuthenticationService,
  private snackBar: MatSnackBar,
  private dialog: MatDialog
) {
  this.module = SubconntractorattendanceApprovalMetadata ;
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
  this.dataHandler.get<SubcontractorlabourgroupaAttendance[]>(this.approvalServiceUrl)
    .subscribe((res: SubcontractorlabourgroupaAttendance[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
}

get approvalServiceUrl() {
  let user = this.authService.loggedInUser;
  return `${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
}

openApproveRemarkDialog(isApproved: boolean): void {
  if (!this.selectedworkorder) {
    const message = 'WARNING : Please select ';
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
    this.selectedworkorder.approvalLevel++;
    this.selectedworkorder.approvedBy = this.authService.loggedInUser.userId;
    this.selectedworkorder.approvedDate = new Date();
  } else {
    this.selectedworkorder.approvalLevel--;
  }
  this.selectedworkorder.indentDetails = this.itemDatasource.data;
  this.dataHandler.put<SubcontractorlabourgroupaAttendance>(this.module.serviceEndPoint, [this.selectedworkorder]).subscribe((res) => {
    this.snackBar.open(`Subcontractor Labour Group Attendance${isApproved ? 'Approved' : 'Rejected'} Successfully`);
    const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedworkorder.id);
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

onRowSelection(selectedIndent: SubcontractorlabourgroupaAttendance) {
  this.selectedworkorder = selectedIndent;
  this.dataSource.data.forEach((row) => {
    row.id === selectedIndent.id ? row.isSelected = true : row.isSelected = false;
  });
  this.dataSource._updateChangeSubscription();
  this.fetchDetails();
}

fetchDetails() {
  let endpoint = `${this.module.serviceEndPoint}List/${this.selectedworkorder.id}`;
  this.dataHandler.get(endpoint).subscribe((res: any[]) => {
    this.itemDatasource = new MatTableDataSource(res);
  })
}

openDialog(rowToEdit?: SubcontractorlabourgroupaAttendance ) {
  this.dialogEventHandler.openDialog(
    SubcontractorlabourgroupattendanceapprovalEditComponent,
    this.dataSource,
    rowToEdit,
    this.affectedRowIndex(rowToEdit)
  )
}

openDeleteDialog(rowToDelete: SubcontractorlabourgroupaAttendance ): void {
  const dummyUserId = 1;
  const dataToComponent = {
    endPoint: `${this.module.serviceEndPoint}/${rowToDelete.id}/${dummyUserId}`,
    deleteUid: rowToDelete.id
  }
  this.dialogEventHandler.openDialog(
    ConfirmModalComponent,
    this.dataSource,
    dataToComponent,
    this.affectedRowIndex(rowToDelete)
  )
}

openEditDialog(rowToEdit?: SubcontractorlabourgroupaAttendance) {
  this.dialogEventHandler.openDialog(
    SubcontractorlabourgroupattendanceEditComponent,
    this.dataSource,
    rowToEdit,
    this.affectedRowIndex(rowToEdit)
  )
}

private affectedRowIndex(affectedRow?: SubcontractorlabourgroupaAttendance) {
  let indexToUpdate;
  if (affectedRow) {
    indexToUpdate = this.dataSource.data.findIndex((row:SubcontractorlabourgroupaAttendance) => row.id === affectedRow.id);
  }
  return indexToUpdate;
}

}

