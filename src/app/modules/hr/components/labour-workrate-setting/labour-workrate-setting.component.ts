import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { LabourWorkrateSettingEditComponent } from './edit/labour-workrate-setting-edit.component';
import { LabourWorkRateSettingMetadata } from './labour-workrate-setting.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { LabourWorkRate } from './definitions/labour-workrate-setting.definition';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-labour-workrate-setting',
  templateUrl: './labour-workrate-setting.component.html',
  styleUrls: ['./labour-workrate-setting.component.css']
})
export class LabourWorkrateSettingComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService
  ) {
    this.module = LabourWorkRateSettingMetadata;
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
    this.dataHandler.get<LabourWorkRate[]>(this.serviceUrl)
      .subscribe((res: LabourWorkRate[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  openDialog(rowToEdit?: LabourWorkRate) {
    this.dialogEventHandler.openDialog(
      LabourWorkrateSettingEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: LabourWorkRate): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.companyId}`,
      deleteUid: rowToDelete.companyId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: LabourWorkRate) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: LabourWorkRate) => row.companyId === affectedRow.companyId);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}