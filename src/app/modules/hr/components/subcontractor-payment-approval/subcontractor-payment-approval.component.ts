import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from 'src/app/modules/common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { SubcontractorPaymentApprovalMetadata} from 'src/app/modules/hr/components/subcontractor-payment-approval/subcontractor-payment-approval.configuration';
import { SubcontractorbillPayment} from 'src/app/modules/hr/components/subcontractorbillpayment/definitions/subcontractor-bill-payment.definition';
import { MatTableDataSource } from '@angular/material/table';
import {SubcontractorWorkBillEditComponent} from 'src/app/modules/hr/components/subcontractor-work-bill/edit/subcontractor-work-bill-edit.component';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { SubcontractorbillpaymentEditComponent } from '../subcontractorbillpayment/edit/subcontractorbillpayment-edit.component';
import { SubcontractorbillpaymentapprovalEditComponent } from './edit/subcontractorbillpayment-approval-edit.component';

@Component({
  selector: 'app-subcontractor-payment-approval',
  templateUrl: './subcontractor-payment-approval.component.html',
  styleUrls: ['./subcontractor-payment-approval.component.css']
})
export class SubcontractorPaymentApprovalComponent implements OnInit {



  module;
  tableColumns;
  dataSource;
  itemTableColumns;
  itemDatasource;
  selectedworkbill;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.module = SubcontractorPaymentApprovalMetadata;
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
    this.dataHandler.get<SubcontractorbillPayment[]>(this.approvalServiceUrl)
      .subscribe((res: SubcontractorbillPayment[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get approvalServiceUrl() {
    let user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selectedworkbill) {
      const message = 'WARNING : Please select an indent';
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
      this.selectedworkbill.approvalLevel++;
      this.selectedworkbill.approvedBy = this.authService.loggedInUser.userId;
      this.selectedworkbill.approvedDate = new Date();
    } else {
      this.selectedworkbill.approvalLevel--;
    }
    this.selectedworkbill.indentDetails = this.itemDatasource.data;
    this.dataHandler.put<SubcontractorbillPayment>(this.module.serviceEndPoint, [this.selectedworkbill]).subscribe((res) => {
      this.snackBar.open(`Subcontractor Payment ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedworkbill.id);
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

  onRowSelection(selectedBill: SubcontractorbillPayment) {
    this.selectedworkbill = selectedBill;
    this.dataSource.data.forEach((row) => {
      row.id === selectedBill.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    this.fetchDetails();
  }

  fetchDetails() {
    let endpoint = `${this.module.serviceEndPoint}List/${this.selectedworkbill.id}/2`;
    this.dataHandler.get(endpoint).subscribe((res: any[]) => {
      this.itemDatasource = new MatTableDataSource(res);
    })
  }

  openDialog(rowToEdit?: SubcontractorbillPayment ) {
    this.dialogEventHandler.openDialog(
      SubcontractorbillpaymentapprovalEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: SubcontractorbillPayment ): void {
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

  openEditDialog(rowToEdit?: SubcontractorbillPayment) {
    this.dialogEventHandler.openDialog(
      SubcontractorWorkBillEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: SubcontractorbillPayment) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row:SubcontractorbillPayment) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

}

