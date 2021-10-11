import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { ForemanWorkBill } from './definitions//foreman-work-bill.definition';
import { ForemanWorkBillApprovalEditComponent } from './edit//foreman-work-bill-approval-edit.component';
import { ForemanWorkBillApprovalMetadata } from './foreman-work-bill-approval.configuration';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';

@Component({
  selector: 'app-foreman-work-bill-approval',
  templateUrl: './foreman-work-bill-approval.component.html',
  styleUrls: ['./foreman-work-bill-approval.component.css']
})
export class ForemanWorkBillApprovalComponent implements OnInit {

  module;
  model: ForemanWorkBill;
  tableColumns;
  dataSource;
  Project: Project[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private pdfExportService: PdfExportService
  ) {
    this.module = ForemanWorkBillApprovalMetadata;
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
    // const data: any = Object.assign({}, this.model);
    // data.projectName = this.Project.find(e => e.id === data.projectId).projectName;
    
  }

  fetchData() {
    // const dummyCompanyId = 1; const dummyBranchId = 0;
    const user = this.authService.loggedInUser;
    this.dataHandler.get<ForemanWorkBill[]>(`${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`)
    .subscribe((res: ForemanWorkBill[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: ForemanWorkBill) {
    this.dialogEventHandler.openDialog(
      ForemanWorkBillApprovalEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: ForemanWorkBill): void {
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

  private affectedRowIndex(affectedRow?: ForemanWorkBill) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: ForemanWorkBill) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onDownloadBtnClick() {
    const data: PdfExportSettings = {
      title: 'Foreman Work Bill Approval',
      tableColumns: this.tableColumns,
      tableRows: this.dataSource.data
    }
    this.pdfExportService.download(data);
  }

}