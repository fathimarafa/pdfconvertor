import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { SubcontractorbillPayment } from './definitions/subcontractor-bill-payment.definition';
import { SubcontractorbillpaymentEditComponent } from './edit/subcontractorbillpayment-edit.component';
import { SubcontractorPaymentMetadata} from './subcontractorbillpayment.configuration';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-subcontractorbillpayment',
  templateUrl: './subcontractorbillpayment.component.html',
  styleUrls: ['./subcontractorbillpayment.component.css']
})
export class SubcontractorbillPaymentComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private pdfExportService: PdfExportService
  ) {
    this.module = SubcontractorPaymentMetadata;
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
    // const dummyCompanyId = 1; const dummyBranchId = 2;
    const user = this.authService.loggedInUser;
    this.dataHandler.get<SubcontractorbillPayment[]>(`${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}`)
      .subscribe((res: SubcontractorbillPayment[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: SubcontractorbillPayment) {
    this.dialogEventHandler.openDialog(
      SubcontractorbillpaymentEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: SubcontractorbillPayment): void {
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

  private affectedRowIndex(affectedRow?:SubcontractorbillPayment) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: SubcontractorbillPayment) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onDownloadBtnClick() {
    const data: PdfExportSettings = {
      title: 'supplier payment',
      tableColumns: this.tableColumns,
      tableRows: this.dataSource.data
    }
    this.pdfExportService.download(data);
  }

}