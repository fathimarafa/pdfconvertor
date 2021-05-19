import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectStageStatusMetadata } from './project-stage-status.configuration';
import { ProjectStageStatusEditComponent } from './edit/project-stage-status-edit.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { ProjectStage } from './definitions/project-stage-status.definition';

@Component({
  selector: 'app-project-stage-status',
  templateUrl: './project-stage-status.component.html',
  styleUrls: ['./project-stage-status.component.css']
})
export class ProjectStageStatusComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  projectStatusTypes;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = ProjectStageStatusMetadata;
    this.tableColumns = this.module.tableColumns;
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
    this.dataHandler.get<ProjectStage[]>(ProjectStageStatusMetadata.serviceEndPoint)
      .subscribe((res: ProjectStage[]) => {
        res.forEach(e => e['stageStatus'] = e.stageStatusId === 1 ? 'Pending' : 'Completed');
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: ProjectStage) {
    this.dialogEventHandler.openDialog(
      ProjectStageStatusEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(rowToEdit?: any): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: any) => row.enquiryId === rowToEdit.enquiryId);
    }
    return indexToUpdate;
  }

}


