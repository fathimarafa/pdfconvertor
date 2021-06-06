import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialReceivedApprovalMetadata } from './material-received-approval.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialReceived } from '../material-received/definitions/material-received.definition';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { MaterialReceivedEditComponent } from '../material-received/edit/material-received-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-material-received-approval',
  templateUrl: './material-received-approval.component.html',
  styleUrls: ['./material-received-approval.component.css']
})
export class MaterialReceivedApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  itemTableColumns;
  itemDatasource;
  selectedItem: MaterialReceived;
  totalAmount = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.module = MaterialReceivedApprovalMetadata;
    this.tableColumns = this.module.tableColumns
    this.itemTableColumns = this.module.itemDetailstableColumns;
    this.fetchData();
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  get itemDataColumns() {
    if (this.itemTableColumns && this.itemTableColumns.length) {
      return this.itemTableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() { }

  fetchData() {
    this.dataHandler.get<MaterialReceived[]>(this.approvalServiceUrl)
      .subscribe((res: MaterialReceived[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get approvalServiceUrl() {
    let user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selectedItem) {
      const message = 'WARNING : Please select a purchase return order';
      this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
      return;
    }
    const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveChanges(isApproved);
      }
    });
  }

  onApproveBtnClick() {
    const isApproved = true;
    this.openApproveRemarkDialog(isApproved);
  }

  onRejectBtnClick() {
    const isApproved = false;
    this.openApproveRemarkDialog(isApproved);
  }

  saveChanges(isApproved: boolean) {
    if (isApproved) {
      this.selectedItem.approvalLevel++;
      this.selectedItem.receiveApprovedBy = this.authService.loggedInUser.userId;
      this.selectedItem.receiveApprovedDate = new Date();
    } else {
      this.selectedItem.approvalLevel--;
    }
    this.selectedItem.recieptDetail = this.itemDatasource.data;
    this.dataHandler.put<MaterialReceived>(this.module.serviceEndPoint, [this.selectedItem]).subscribe((res) => {
      this.snackBar.open(`Trannsfer Request Order ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedItem.id);
      if (rowToRemove !== -1) {
        this.dataSource.data.splice(rowToRemove, 1);
        this.dataSource._updateChangeSubscription();
        this.itemDatasource.data = [];
        this.itemDatasource._updateChangeSubscription();
      }
    })
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onRowSelection(selectedItem: MaterialReceived) {
    this.selectedItem = selectedItem;
    this.dataSource.data.forEach((row) => {
      row.id === selectedItem.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    this.fetchDetails();
  }

  fetchDetails() {
    let endpoint = `${this.module.serviceEndPoint}List/${this.selectedItem.id}`;
    this.dataHandler.get(endpoint).subscribe((res: any[]) => {
      this.totalAmount = 0;
      res.forEach((e) => {
        const total = e.quantity * e.rate;
        const tax = total * (e.tax / 100);
        e.total = total + (tax || 0);
        this.totalAmount = this.totalAmount + e.total;
      });
      this.itemDatasource = new MatTableDataSource(res);
    })
  }

  openEditDialog(rowToEdit?: MaterialReceived) {
    this.dialogEventHandler.openDialog(
      MaterialReceivedEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: MaterialReceived) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialReceived) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

}