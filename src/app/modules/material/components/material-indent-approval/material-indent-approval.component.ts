import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialIndentApprovalMetadata } from './material-indent-approval.configuration';
import { MaterialIndent } from '../material-indent-creation/definitions/material-indent-creation.definiton';
import { MaterialIndentCreationMetadata } from '../material-indent-creation/material-indent-creation.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
  ) {
    this.module = MaterialIndentApprovalMetadata;
    this.tableColumns = this.module.tableColumns
    this.itemTableColumns = this.module.itemDetailstableColumns;
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

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const user = this.authService.loggedInUser;
    const endpoint = `${MaterialIndentCreationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`
    this.dataHandler.get<MaterialIndent[]>(endpoint)
      .subscribe((res: MaterialIndent[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onApproveBtnClick() {
    if (!this.selectedIndent) {
      this.snackBar.open('WARNING :  Please select an indent');
      return;
    }
    this.selectedIndent.approvalLevel++;
    this.selectedIndent.approvedBy = this.authService.loggedInUser.userId;
    this.selectedIndent.approvedDate = new Date();
    this.dataHandler.put<MaterialIndent>(MaterialIndentCreationMetadata.serviceEndPoint, [this.selectedIndent]).subscribe((res) => {
      this.snackBar.open('Indent Approved Successfully');
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedIndent.id);
      if (rowToRemove !== -1) {
        this.dataSource.data.splice(rowToRemove, 1);
        this.dataSource._updateChangeSubscription();
        this.itemDatasource.data = [];
        this.itemDatasource._updateChangeSubscription();
      }
    })
  }

  onRejectBtnClick() {
    if (!this.selectedIndent) {
      this.snackBar.open('WARNING :  Please select an indent');
      return;
    }
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
    this.itemDatasource = new MatTableDataSource(selectedIndent.indentDetails);
  }

}