import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { BasicChequeClearenceMetadata } from './basic-cheque-clearence.configuration';
import { BasicChequeClearence } from './definitions/basic-cheque-clearence.definition';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-basic-cheque-clearence',
  templateUrl: './basic-cheque-clearence.component.html',
  styleUrls: ['./basic-cheque-clearence.component.css']
})
export class BasicChequeClearenceComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  chequeTypes = [
    {
      label: 'Payment Cheque',
      value: 'P'
    },
    {
      label: 'Receipt Cheque',
      value: 'R'
    }
  ]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.module = BasicChequeClearenceMetadata;
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
    this.dataHandler.get<BasicChequeClearence[]>(this.serviceUrl)
      .subscribe((res: BasicChequeClearence[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  openDeleteDialog(rowToDelete: BasicChequeClearence): void {
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

  private affectedRowIndex(rowToEdit?: BasicChequeClearence): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: BasicChequeClearence) => row.id === rowToEdit.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onCheckClearanceChange(row: BasicChequeClearence) {
    row.clearenceStatus = row.clearenceStatus ? 0 : 1;
    this.dataHandler.put<BasicChequeClearence>(this.module.serviceEndPoint, row)
      .subscribe((res) => {
        const indexToRemove = this.dataSource.data.findIndex((e) => e.id === row.id)
        this.dataSource.data.splice(indexToRemove, 1)
        this.dataSource._updateChangeSubscription();
        this.snackBar.open('Cheque Cleared Successfully');
      });
  }

}