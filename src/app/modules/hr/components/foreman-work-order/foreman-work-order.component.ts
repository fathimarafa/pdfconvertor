import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { ForemanWorkOrder } from './definitions//foreman-work-order.definition';
import { ForemanWorkOrderEditComponent } from './edit//foreman-work-order-edit.component';
import { ForemanWorkOrderMetadata } from './foreman-work-order.configuration';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';

@Component({
  selector: 'app-foreman-work-order',
  templateUrl: './foreman-work-order.component.html',
  styleUrls: ['./foreman-work-order.component.css']
})
export class ForemanWorkOrderComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private pdfExportService: PdfExportService
  ) {
    this.module = ForemanWorkOrderMetadata;
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
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<ForemanWorkOrder[]>(`${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: ForemanWorkOrder[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: ForemanWorkOrder) {
    this.dialogEventHandler.openDialog(
      ForemanWorkOrderEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: ForemanWorkOrder): void {
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

  private affectedRowIndex(affectedRow?: ForemanWorkOrder) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: ForemanWorkOrder) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onDownloadBtnClick() {
    const data: PdfExportSettings = {
      title: 'Foreman Work Order',
      tableColumns: this.tableColumns,
      tableRows: this.dataSource.data
    }
    this.pdfExportService.download(data);
  }

}