import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { ContractorPayment } from './definitions//contractor-payment.definition';
import { ContractorPaymentApprovalEditComponent } from './edit//contractor-payment-approval-edit.component';
import { ContractorPaymentApprovalMetadata } from './contractor-payment-approval.configuration';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-contractor-payment-approval',
  templateUrl: './contractor-payment-approval.component.html',
  styleUrls: ['./contractor-payment-approval.component.css']
})
export class ContractorPaymentApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private pdfExportService: PdfExportService,
    private authService: AuthenticationService,

  ) {
    this.module = ContractorPaymentApprovalMetadata;
    this.tableColumns = this.module.tableColumns
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const user = this.authService.loggedInUser;
    this.dataHandler.get<ContractorPayment[]>(`${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`)
      .subscribe((res: ContractorPayment[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: ContractorPayment) {
    this.dialogEventHandler.openDialog(
      ContractorPaymentApprovalEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: ContractorPayment): void {
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

  private affectedRowIndex(affectedRow?: ContractorPayment) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: ContractorPayment) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onDownloadBtnClick() {
    const data: PdfExportSettings = {
      title: 'contractor payment',
      tableColumns: this.tableColumns,
      tableRows: this.dataSource.data
    }
    this.pdfExportService.download(data);
  }

}