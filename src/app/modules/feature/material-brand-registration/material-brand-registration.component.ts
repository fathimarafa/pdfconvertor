import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialBrandRegistration } from './definitions/material-brand.definition';
import { MaterialBrandRegistrationEditComponent } from './edit/material-brand-registration-edit.component';
import { MaterialBrandRegistrationMetadata } from './material-brand-registration.configuration';

@Component({
  selector: 'app-material-brand-registration',
  templateUrl: './material-brand-registration.component.html',
  styleUrls: ['./material-brand-registration.component.css']
})
export class MaterialBrandRegistrationComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = MaterialBrandRegistrationMetadata;
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
    this.dataHandler.get<MaterialBrandRegistration[]>(this.module.serviceEndPoint)
      .subscribe((res: MaterialBrandRegistration[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: MaterialBrandRegistration) {
    this.dialogEventHandler.openDialog(
      MaterialBrandRegistrationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: MaterialBrandRegistration): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.materialBrandId}`,
      deleteUid: rowToDelete.materialBrandId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: MaterialBrandRegistration) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialBrandRegistration) => row.materialBrandId === affectedRow.materialBrandId);
    }
    return indexToUpdate;
  }

}