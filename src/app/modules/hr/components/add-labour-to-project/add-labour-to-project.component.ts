import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { LaboursInProject } from './definitions//labours-in-project.definition';
import { AddLabourToProjectEditComponent } from './edit//add-labour-to-project-edit.component';
import { AddLabourToProjectMetadata } from './add-labour-to-project.configuration';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';

@Component({
  selector: 'app-add-labour-to-project',
  templateUrl: './add-labour-to-project.component.html',
  styleUrls: ['./add-labour-to-project.component.css']
})
export class AddLabourToProjectComponent implements OnInit {
  private _updateChangeSubscription() {
    throw new Error('Method not implemented.');
  }

  module;
  model: LaboursInProject;
  tableColumns;
  dataSource;
  Project: Project[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  data: any;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private pdfExportService: PdfExportService
  ) {
    this.module = AddLabourToProjectMetadata;
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
    this.dataHandler.get<LaboursInProject[]>(`${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`)
    .subscribe((res: LaboursInProject[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: LaboursInProject) {
    this.dialogEventHandler.openDialog(
      AddLabourToProjectEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: LaboursInProject): void {
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

  private affectedRowIndex(affectedRow?: LaboursInProject) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: LaboursInProject) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onDownloadBtnClick() {
    const data: PdfExportSettings = {
      title: 'AddLabourToProject',
      tableColumns: this.tableColumns,
      tableRows: this.dataSource.data
    }
    this.pdfExportService.download(data);
  }

}