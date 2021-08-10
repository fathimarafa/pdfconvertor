import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from 'src/app/modules/common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { LabourAttendanceEntryApprovalMetadata} from 'src/app/modules/hr/components/labour-attendance-entry-approval/labour-attendance-entry-approval.configuration';
import { AttendanceEntry} from 'src/app/modules/hr/components/labour-attendance-entry/definitions/attendance.definition';
import { MatTableDataSource } from '@angular/material/table';
import { LabourAttendanceEntryEditComponent} from 'src/app/modules/hr/components/labour-attendance-entry/edit/labour-attendance-entry-edit.component';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';

@Component({
  selector: 'app-labour-attendance-entry-approval',
  templateUrl: './labour-attendance-entry-approval.component.html',
  styleUrls: ['./labour-attendance-entry-approval.component.css']
})
export class LabourAttendanceEntryApprovalComponent implements OnInit {



  module;
  tableColumns;
  dataSource;
  itemTableColumns;
  itemDatasource;
  selectedattendance;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.module = LabourAttendanceEntryApprovalMetadata ;
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
    this.dataHandler.get<AttendanceEntry[]>(this.approvalServiceUrl)
      .subscribe((res: AttendanceEntry[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get approvalServiceUrl() {
    let user = this.authService.loggedInUser;
    const menuId = 4109;
    return `${this.module.serviceEndPoint}Monthly/${user.companyId}/${user.branchId}/${user.userId}/${menuId}`;
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selectedattendance) {
      const message = 'WARNING : Please select an attendance';
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
      this.selectedattendance.approvalLevel++;
      this.selectedattendance.approvedBy = this.authService.loggedInUser.userId;
      this.selectedattendance.approvedDate = new Date();
    } else {
      this.selectedattendance.approvalLevel--;
    }
    this.selectedattendance.indentDetails = this.itemDatasource.data;
    this.dataHandler.put<AttendanceEntry>("BuildExeHR/api/AttendanceMonthly", [this.selectedattendance]).subscribe((res) => {
      this.snackBar.open(` ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedattendance.id);
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

  onRowSelection(selectedAttendance: AttendanceEntry) {
    this.selectedattendance = selectedAttendance;
    this.dataSource.data.forEach((row) => {
      row.id === selectedAttendance.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    this.fetchDetails();
  }

  fetchDetails() {
    let endpoint = `${this.module.serviceEndPoint}Monthly/${this.selectedattendance.id}`;
    this.dataHandler.get(endpoint).subscribe((res: any[]) => {
      this.itemDatasource = new MatTableDataSource(res);
    })
  }

  openDialog(rowToEdit?: AttendanceEntry ) {
    this.dialogEventHandler.openDialog(
      LabourAttendanceEntryEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: AttendanceEntry ): void {
    const dummyUserId = 1;
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}Monthly/${rowToDelete.id}/${dummyUserId}`,
      deleteUid: rowToDelete.id
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  openEditDialog(rowToEdit?: AttendanceEntry) {
    this.dialogEventHandler.openDialog(
      LabourAttendanceEntryEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: AttendanceEntry) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row:AttendanceEntry) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

}

