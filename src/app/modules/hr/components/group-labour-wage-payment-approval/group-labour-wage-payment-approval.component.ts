import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from 'src/app/modules/common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { GroupLabourWagePaymentApprovalMetadata} from 'src/app/modules/hr/components/group-labour-wage-payment-approval/group-labour-wage-payment-approval.configuration';
import { GroupLabourWagePayment} from 'src/app/modules/hr/components/group-labour-wage-payment/definitions/group-labour-wage-payment.definition';
import { MatTableDataSource } from '@angular/material/table';
import { GroupLabourWagePaymentEditComponent} from 'src/app/modules/hr/components/group-labour-wage-payment/edit/group-labour-wage-payment-edit.component';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';

@Component({
  selector: 'app-group-labour-wage-payment-approval',
  templateUrl: './group-labour-wage-payment-approval.component.html',
  styleUrls: ['./group-labour-wage-payment-approval.component.css']
})
export class GroupLabourWagePaymentApprovalComponent implements OnInit {



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
    this.module = GroupLabourWagePaymentApprovalMetadata ;
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
    this.dataHandler.get<GroupLabourWagePayment[]>(this.approvalServiceUrl)
      .subscribe((res: GroupLabourWagePayment[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get approvalServiceUrl() {
    let user = this.authService.loggedInUser;
    
    return `${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selectedattendance) {
      const message = 'WARNING : Please select a payment';
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
    this.dataHandler.put<GroupLabourWagePayment>(this.module.serviceEndPoint, [this.selectedattendance]).subscribe((res) => {
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

  onRowSelection(selectedAttendance: GroupLabourWagePayment) {
    this.selectedattendance = selectedAttendance;
    this.dataSource.data.forEach((row) => {
      row.id === selectedAttendance.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    this.fetchDetails();
  }

  fetchDetails() {
    let endpoint = `${this.module.serviceEndPoint}List/${this.selectedattendance.id}`;
    this.dataHandler.get(endpoint).subscribe((res: any[]) => {
      this.itemDatasource = new MatTableDataSource(res);
    })
  }

  openDialog(rowToEdit?: GroupLabourWagePayment ) {
    this.dialogEventHandler.openDialog(
      GroupLabourWagePaymentEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: GroupLabourWagePayment ): void {
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

  openEditDialog(rowToEdit?: GroupLabourWagePayment) {
    this.dialogEventHandler.openDialog(
      GroupLabourWagePaymentEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: GroupLabourWagePayment) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row:GroupLabourWagePayment) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

}

