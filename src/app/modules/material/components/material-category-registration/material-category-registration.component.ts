import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialCategoryRegistration } from './definitions/material-category.definition';
import { MaterialCategoryRegistrationEditComponent } from './edit/material-category-registration-edit.component';
import { MaterialCategoryRegistrationMetadata } from './material-category-registration.configuration';

@Component({
  selector: 'app-material-category-registration',
  templateUrl: './material-category-registration.component.html',
  styleUrls: ['./material-category-registration.component.css']
})
export class MaterialCategoryRegistrationComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = MaterialCategoryRegistrationMetadata;
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
    this.dataHandler.get<MaterialCategoryRegistration[]>(`${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: MaterialCategoryRegistration[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: MaterialCategoryRegistration) {
    this.dialogEventHandler.openDialog(
      MaterialCategoryRegistrationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: MaterialCategoryRegistration): void {
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

  private affectedRowIndex(affectedRow?: MaterialCategoryRegistration) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialCategoryRegistration) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}