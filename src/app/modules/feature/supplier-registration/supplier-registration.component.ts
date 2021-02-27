import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';
import { SupplierRegistrationEditComponent } from './edit/supplier-registration-edit.component';
import { SupplierRegistrationMetadata } from './supplier-registration.configuration';
import { DataHandlerService } from '../../../services/datahandler/datahandler.service';
import { SupplierRegistration } from './definitions/supplier-registration.definition';
import { DialogEventHandlerService } from '../../../services/dialog-event-handler/dialogeventhandler.service';

@Component({
  selector: 'app-supplier-registration',
  templateUrl: './supplier-registration.component.html',
  styleUrls: ['./supplier-registration.component.css']
})
export class SupplierRegistrationComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = SupplierRegistrationMetadata;
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
    this.dataHandler.get<SupplierRegistration[]>(this.module.serviceEndPoint)
      .subscribe((res: SupplierRegistration[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: SupplierRegistration) {
    this.dialogEventHandler.openDialog(
      SupplierRegistrationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  openDeleteDialog(rowToDelete: SupplierRegistration): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.supplierRegistationId}`,
      deleteUid: rowToDelete.supplierRegistationId
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: SupplierRegistration) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: SupplierRegistration) => row.supplierRegistationId === affectedRow.supplierRegistationId);
    }
    return indexToUpdate;
  }

}