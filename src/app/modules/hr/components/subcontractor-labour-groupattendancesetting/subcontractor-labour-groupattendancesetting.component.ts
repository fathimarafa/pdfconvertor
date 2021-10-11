import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import {  SubcontractorlaboutgroupattendanceMetadata} from './subcontractor-labour-groupattendancesetting.configuration';
import { SubcontractorlabourgroupaAttendance } from './definitions/subcontractor-labour-groupattendancesetting.definition';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { ConfirmModalComponent } from 'src/app/modules/common/confirm-modal/confirm-modal.component';
import { SubcontractorlabourgroupattendanceEditComponent } from './edit/subcontractor-labour-groupattendancesetting-edit.component';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-subcontractor-labour-groupattendancesetting',
  templateUrl: './subcontractor-labour-groupattendancesetting.component.html',
  styleUrls: ['./subcontractor-labour-groupattendancesetting.component.css']
})
export class SubcontractorlabourgroupattendanceComponent implements OnInit {

 
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
    this.module = SubcontractorlaboutgroupattendanceMetadata;
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
    // const dummyCompanyId = 1; const dummyBranchId = 0;
    const user = this.authService.loggedInUser;
    this.dataHandler.get<SubcontractorlabourgroupaAttendance[]>(`${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}`)
      .subscribe((res: SubcontractorlabourgroupaAttendance[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: SubcontractorlabourgroupaAttendance) {
    this.dialogEventHandler.openDialog(
      SubcontractorlabourgroupattendanceEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete:SubcontractorlabourgroupaAttendance): void {
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

  private affectedRowIndex(affectedRow?: SubcontractorlabourgroupaAttendance) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: SubcontractorlabourgroupaAttendance) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onDownloadBtnClick() {
    const data: PdfExportSettings = {
      title: 'material issue',
      tableColumns: this.tableColumns,
      tableRows: this.dataSource.data
    }
    this.pdfExportService.download(data);
  }

}