import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { MaterialQuotationEditComponent } from './edit//material-quotation-edit.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { MaterialQuotation } from './definitions/material-quotation.definition';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialQuotationMetadata } from './material-quotation.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-material-quotation',
  templateUrl: './material-quotation.component.html',
  styleUrls: ['./material-quotation.component.css']
})
export class MaterialQuotationComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService
  ) {
    this.module = MaterialQuotationMetadata;
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
    this.dataHandler.get<MaterialQuotation[]>(this.serviceUrl)
      .subscribe((res: MaterialQuotation[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  openDialog(rowToEdit?: MaterialQuotation) {
    this.dialogEventHandler.openDialog(
      MaterialQuotationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }


  openDeleteDialog(rowToDelete: MaterialQuotation): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.id}/${this.authService.loggedInUser.userId}`,
      deleteUid: rowToDelete.id
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(rowToEdit?: MaterialQuotation): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialQuotation) => row.id === rowToEdit.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}