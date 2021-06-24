import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialQuotationApprovalMetadata } from './material-quotation-approval.configuration';
import { MaterialIndentCreationMetadata } from '../material-indent-creation/material-indent-creation.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialQuotation } from '../material-quotation/definitions/material-quotation.definition';
import { QuotationBaseRateFeedingMetadata } from '../quotation-base-rate-feeding/quotation-base-rate-feeding.configuration';
import { QuotationBaseRateFeeding } from '../quotation-base-rate-feeding/definitions/quotation-base-rate-feeding.definition';
import { MaterialQuotationEditComponent } from '../material-quotation/edit/material-quotation-edit.component';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-material-quotation-approval',
  templateUrl: './material-quotation-approval.component.html',
  styleUrls: ['./material-quotation-approval.component.css']
})
export class MaterialQuotationApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  itemTableColumns;
  itemDatasource;
  selectedQuotation: MaterialQuotation;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.module = MaterialQuotationApprovalMetadata;
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

  fetchData() {
    const user = this.authService.loggedInUser;
    const endpoint = `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`
    this.dataHandler.get<MaterialQuotation[]>(endpoint)
      .subscribe((res: MaterialQuotation[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selectedQuotation) {
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
    // if (isApproved) {
    //   this.selectedQuotation.approvalLevel++;
    //   this.selectedQuotation.approvedBy = this.authService.loggedInUser.userId;
    //   this.selectedQuotation.approvedDate = new Date();
    // } else {
    //   this.selectedQuotation.approvalLevel--;
    // }
    // this.selectedQuotation.purchaseDetail = this.itemDatasource.data;
    // this.dataHandler.put<MaterialStockEntry>(this.module.serviceEndPoint, [this.selectedItem]).subscribe((res) => {
    //   this.snackBar.open(`Stock Entry ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
    //   const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedItem.id);
    //   if (rowToRemove !== -1) {
    //     this.dataSource.data.splice(rowToRemove, 1);
    //     this.dataSource._updateChangeSubscription();
    //     this.itemDatasource.data = [];
    //     this.itemDatasource._updateChangeSubscription();
    //   }
    // })
  }

  onRowSelection(selected: MaterialQuotation) {
    this.selectedQuotation = selected;
    this.dataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    this.fetchBaseRate();
  }

  fetchBaseRate() {
    this.dataHandler.get<QuotationBaseRateFeeding[]>(this.baseRateServiceUrl)
      .subscribe((res: QuotationBaseRateFeeding[]) => {
        const rows = res.filter(e => e.quotationId === this.selectedQuotation.id);
        rows.sort((a, b) => a.baseRate > b.baseRate ? 1 : -1);
        this.itemDatasource = new MatTableDataSource(rows);
      });
  }

  get baseRateServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${QuotationBaseRateFeedingMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  openEditDialog(rowToEdit?: MaterialQuotation) {
    this.dialogEventHandler.openDialog(
      MaterialQuotationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: MaterialQuotation) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialQuotation) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}