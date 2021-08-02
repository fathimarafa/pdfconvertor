import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { LoanOrAdvancePaymentMetaData } from './loan-or-advance-payment.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { LoanOrAdvancePayment } from './definitions/loan-or-advance-payment.definition';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { LoanOrAdvancePaymentEditComponent } from './edit/loan-or-advance-payment-edit.component';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-loan-or-advance-payment',
  templateUrl: './loan-or-advance-payment.component.html',
  styleUrls: ['./loan-or-advance-payment.component.css'],
})
export class LoanOrAdvancePaymentComponent implements OnInit {
  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authenticationService: AuthenticationService
  ) {
    this.module = LoanOrAdvancePaymentMetaData;
    this.tableColumns = this.module.tableColumns;
  }
  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map((col) => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const user = this.authenticationService.loggedInUser;
    this.dataHandler
      .get<LoanOrAdvancePayment[]>(
        this.module.serviceEndPoint + `/${user.companyId}/${user.branchId}`
      )
      .subscribe((res: LoanOrAdvancePayment[]) => {
        if (res?.length > 0) {
          res.forEach((item) => {
            item.date = new Date(item.date).toISOString().slice(0, 10);
          });
        }
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(rowToEdit?: LoanOrAdvancePayment) {
    this.dialogEventHandler.openDialog(
      LoanOrAdvancePaymentEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    );
  }

  openDeleteDialog(rowToDelete: LoanOrAdvancePayment): void {
    const user = this.authenticationService.loggedInUser;
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.id}/${user.userId}`,
      deleteUid: rowToDelete.id,
    };
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    );
  }

  private affectedRowIndex(affectedRow?: LoanOrAdvancePayment) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex(
        (row: LoanOrAdvancePayment) => row.id === affectedRow.id
      );
    }
    return indexToUpdate;
  }
}
