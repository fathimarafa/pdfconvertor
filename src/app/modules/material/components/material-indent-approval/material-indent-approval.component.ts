import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialIndentApprovalMetadata } from './material-indent-approval.configuration';
import { MaterialIndent } from '../material-indent-creation/definitions/material-indent-creation.definiton';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialIndentCreationEditComponent } from '../material-indent-creation/edit/material-indent-creation-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
@Component({
  selector: 'app-material-indent-approval',
  templateUrl: './material-indent-approval.component.html',
  styleUrls: ['./material-indent-approval.component.css']
})
export class MaterialIndentApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  itemTableColumns;
  itemDatasource;
  selectedIndent;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.module = MaterialIndentApprovalMetadata;
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
    this.dataHandler.get<MaterialIndent[]>(this.approvalServiceUrl)
      .subscribe((res: MaterialIndent[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get approvalServiceUrl() {
    let user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selectedIndent) {
      const message = 'WARNING : Please select an indent';
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
      this.selectedIndent.approvalLevel++;
      this.selectedIndent.approvedBy = this.authService.loggedInUser.userId;
      this.selectedIndent.approvedDate = new Date();
    } else {
      this.selectedIndent.approvalLevel--;
    }
    this.selectedIndent.indentDetails = this.itemDatasource.data;
    this.dataHandler.put<MaterialIndent>(this.module.serviceEndPoint, [this.selectedIndent]).subscribe((res) => {
      this.snackBar.open(`Indent ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedIndent.id);
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

  onRowSelection(selectedIndent: MaterialIndent) {
    this.selectedIndent = selectedIndent;
    this.dataSource.data.forEach((row) => {
      row.id === selectedIndent.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    this.fetchDetails();
  }

  fetchDetails() {
    let endpoint = `${this.module.serviceEndPoint}List/${this.selectedIndent.id}`;
    this.dataHandler.get(endpoint).subscribe((res: any[]) => {
      this.itemDatasource = new MatTableDataSource(res);
    })
  }

  openEditDialog(rowToEdit?: MaterialIndent) {
    this.dialogEventHandler.openDialog(
      MaterialIndentCreationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: MaterialIndent) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialIndent) => row.id === affectedRow.id);
    }
    return indexToUpdate;
  }

}