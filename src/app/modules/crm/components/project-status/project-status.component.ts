import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { ProjectStatusMetadata } from './project-status.configuration';
import { ProjectStatusEditComponent } from './edit/project-status-edit.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { ProjectStatus } from './definitions/project-status.definition';
import { ProjectMetadata } from '../project/project.configuration';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.css']
})
export class ProjectStatusComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  projectStatusTypes;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = ProjectStatusMetadata;
    this.tableColumns = this.module.tableColumns;
    this.defineProjectStatus()
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataHandler.get<any[]>(ProjectMetadata.serviceEndPoint)
      .subscribe((res: any[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: any) {
    this.dialogEventHandler.openDialog(
      ProjectStatusEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: any): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.enquiryId}`,
      deleteUid: rowToDelete.enquiryId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(rowToEdit?: any): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: any) => row.enquiryId === rowToEdit.enquiryId);
    }
    return indexToUpdate;
  }

  private defineProjectStatus() {
    this.projectStatusTypes = {
      1: 'PENDING',
      2: 'TENDER SUBMITTED',
      3: 'TENDER OPENED',
      4: 'NEGOTIATED',
      5: 'WORK ORDER',
      6: 'ACTIVE',
      7: 'SILENT',
      8: 'REJECTED',
      9: 'COMPLETED',
      10: 'ENQUIRY',
    }
  }

}
