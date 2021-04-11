import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { FollowUpEditComponent } from './edit/follow-up-edit.component';
import { FollowUpMetadata } from './follow-up.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { FollowUp } from './definitions/follow-up.definition';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { ProjectEnquiry } from '../project-enquiry/definitions/project-enquiry.definition';
import { ProjectEnquiryMetadata } from '../project-enquiry/project-enquiry.configuration';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  enquiryList: ProjectEnquiry[];
  selectedEnquiry;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private pdfExportService: PdfExportService
  ) {
    this.module = FollowUpMetadata;
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
    this.fetchEnquriy();
  }

  fetchData() {
    this.dataHandler.get<FollowUp[]>(this.module.serviceEndPoint)
      .subscribe((res: any[]) => {
        res.forEach((e) => {
          const exists = this.enquiryList.find(enq => enq.enquiryId === e.enquiryId);
          if (exists) {
            e.enquiryNo = exists.enquiryNo;
          }
        });
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.selectedEnquiry = res[0].enquiryId;
        this.doFilter(this.selectedEnquiry);
      });
  }

  openDialog(rowToEdit?: FollowUp) {
    this.dialogEventHandler.openDialog(
      FollowUpEditComponent,
      this.dataSource,
      rowToEdit || { enquiryId: this.selectedEnquiry },
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: FollowUp): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.followupId}`,
      deleteUid: rowToDelete.followupId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: FollowUp) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: FollowUp) => row.followupId === affectedRow.followupId);
    }
    return indexToUpdate;
  }

  private fetchEnquriy() {
    this.dataHandler.get<ProjectEnquiry[]>(ProjectEnquiryMetadata.serviceEndPoint)
      .subscribe((res: ProjectEnquiry[]) => {
        this.enquiryList = res;
        this.fetchData();
      });
  }

  doFilter(value: string) {
    this.selectedEnquiry = value;
    this.dataSource.filter = value + ''; //.trim().toLocaleLowerCase();
  }

  onDownloadBtnClick() {
    const data: PdfExportSettings = {
      title: 'follow up',
      tableColumns: this.tableColumns,
      tableRows: this.dataSource.data
    }
    this.pdfExportService.download(data);
  }

}