import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialReceivedApprovalMetadata } from './material-received-approval.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialReceived } from '../material-received/definitions/material-received.definition';

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
  selected: MaterialReceived;
  totalAmount = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
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
    this.dataHandler.get<MaterialReceived[]>(this.serviceUrl)
      .subscribe((res: MaterialReceived[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }


  onApproveBtnClick() {
    if (!this.selected) {
      this.snackBar.open('WARNING :  Please select a material received');
      return;
    }
    this.selected.approvalLevel++;
    this.selected.receiveApprovedBy = this.authService.loggedInUser.userId;
    this.selected.receiveApprovedDate = new Date();
    this.dataHandler.put<MaterialReceived>(this.module.serviceEndPoint, [this.selected]).subscribe((res) => {
      this.snackBar.open('Material Received Approved Successfully');
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selected.id);
      if (rowToRemove !== -1) {
        this.dataSource.data.splice(rowToRemove, 1);
        this.dataSource._updateChangeSubscription();
        this.itemDatasource.data = [];
        this.itemDatasource._updateChangeSubscription();
      }
    })
  }

  onRejectBtnClick() {
    if (!this.selected) {
      this.snackBar.open('WARNING :  Please select a material received');
      return;
    }
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  onRowSelection(selected: MaterialReceived) {
    this.selected = selected;
    this.dataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    selected.recieptDetail.forEach(e => {
      e['total'] = e.quantity * e.rate;
      this.totalAmount = this.totalAmount + e['total'];
    })
    this.itemDatasource = new MatTableDataSource(selected.recieptDetail);
  }

}