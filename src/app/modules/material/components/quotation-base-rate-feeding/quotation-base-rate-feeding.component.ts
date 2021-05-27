import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { QuotationBaseRateFeedingEditComponent } from './edit/quotation-base-rate-feeding-edit.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { QuotationBaseRateFeedingMetadata } from './quotation-base-rate-feeding.configuration';
import { QuotationBaseRateFeeding } from './definitions/quotation-base-rate-feeding.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-quotation-base-rate-feeding',
  templateUrl: './quotation-base-rate-feeding.component.html',
  styleUrls: ['./quotation-base-rate-feeding.component.css']
})
export class QuotationBaseRateFeedingComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService
  ) {
    this.module = QuotationBaseRateFeedingMetadata;
    this.tableColumns = this.module.tableColumns
    this.fetchData();
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() { }

  fetchData() {
    this.dataHandler.get<QuotationBaseRateFeeding[]>(this.serviceUrl)
      .subscribe((res: QuotationBaseRateFeeding[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  openDialog(rowToEdit?: QuotationBaseRateFeeding) {
    this.dialogEventHandler.openDialog(
      QuotationBaseRateFeedingEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }


  openDeleteDialog(rowToDelete: QuotationBaseRateFeeding): void {
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

  private affectedRowIndex(rowToEdit?: QuotationBaseRateFeeding): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: QuotationBaseRateFeeding) => row.id === rowToEdit.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}