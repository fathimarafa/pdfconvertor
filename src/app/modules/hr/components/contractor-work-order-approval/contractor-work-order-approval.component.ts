import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { ContractorWorkOrder } from './definitions//contractor-work-order.definition';
import { ContractorWorkOrderApprovalEditComponent } from './edit//contractor-work-order-approval-edit.component';
import { ContractorWorkOrderApprovalMetadata } from './contractor-work-order-approval.configuration';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-contractor-work-order-approval',
  templateUrl: './contractor-work-order-approval.component.html',
  styleUrls: ['./contractor-work-order-approval.component.css']
})
export class ContractorWorkOrderApprovalComponent implements OnInit {

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
    this.module = ContractorWorkOrderApprovalMetadata;
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
    this.dataHandler.get<ContractorWorkOrder[]>(`${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`)
      .subscribe((res: ContractorWorkOrder[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: ContractorWorkOrder) {
    this.dialogEventHandler.openDialog(
      ContractorWorkOrderApprovalEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: ContractorWorkOrder): void {
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

  private affectedRowIndex(affectedRow?: ContractorWorkOrder) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: ContractorWorkOrder) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onDownloadBtnClick() {
    const data: PdfExportSettings = {
      title: 'Contractor Work Order',
      tableColumns: this.tableColumns,
      tableRows: this.dataSource.data
    }
    this.pdfExportService.download(data);
  }

}