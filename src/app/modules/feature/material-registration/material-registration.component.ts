import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialRegistration } from './definitions/material-registration.definition';
import { MaterialRegistrationEditComponent } from './edit/material-registration-edit.component';
import { MaterialRegistrationMetadata } from './material-registration.configuration';

@Component({
  selector: 'app-material-registration',
  templateUrl: './material-registration.component.html',
  styleUrls: ['./material-registration.component.css']
})
export class MaterialRegistrationComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = MaterialRegistrationMetadata;
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
    this.dataHandler.get<MaterialRegistration[]>(this.module.serviceEndPoint)
      .subscribe((res: MaterialRegistration[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: MaterialRegistration) {
    this.dialogEventHandler.openDialog(
      MaterialRegistrationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: MaterialRegistration): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.materialUID}`,
      deleteUid: rowToDelete.materialUID
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: MaterialRegistration) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialRegistration) => row.materialUID === affectedRow.materialUID);
    }
    return indexToUpdate;
  }

}