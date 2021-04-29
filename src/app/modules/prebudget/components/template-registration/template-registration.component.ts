import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { Template } from './definitions/template-registration.definition';
import { TemplateRegistrationMetadata } from './template-registration.configuration';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';

@Component({
  selector: 'app-template-registration',
  templateUrl: './template-registration.component.html',
  styleUrls: ['./template-registration.component.css']
})
export class TemplateRegistrationComponent implements OnInit {


  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private router: Router,
    private stateService: AppStateService
  ) {
    this.module = TemplateRegistrationMetadata;
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
    this.dataHandler.get<Template[]>(`${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: Template[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onAddEditBtnClick(rowToEdit?: Template) {
    if (rowToEdit) {
      this.stateService.setState(this.module.moduleId, rowToEdit);
    }
    this.router.navigateByUrl('/home/addtemplate');
  }

  openDeleteDialog(rowToDelete: Template): void {
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

  private affectedRowIndex(affectedRow?: Template) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: Template) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}