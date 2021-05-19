import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdditionalBillApprovalMetadata } from './additional-bill-approval.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { ProjectMetadata } from '../project/project.configuration';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdditionBillGeneration } from '../additional-bill-generation/definitions/additional-bill-generation.definition';

@Component({
  selector: 'app-additional-bill-approval',
  templateUrl: './additional-bill-approval.component.html',
  styleUrls: ['./additional-bill-approval.component.css']
})
export class AdditionalBillApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  projectStatusTypes;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private snackBar: MatSnackBar
  ) {
    this.module = AdditionalBillApprovalMetadata;
    this.tableColumns = this.module.tableColumns;
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataHandler.get<AdditionBillGeneration[]>(this.module.serviceEndPoint)
      .subscribe((res: AdditionBillGeneration[]) => {
        //res.filter(e => e.approvalStatus === 0)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onApproveBtnClick(selectedRow?: AdditionBillGeneration) {
    selectedRow.approvalStatus = 1;
    selectedRow.approvedDate = new Date();
    this.dataHandler.put<AdditionBillGeneration[]>(ProjectMetadata.serviceEndPoint, [selectedRow])
      .subscribe((res: AdditionBillGeneration[]) => {
        this.snackBar.open('Data Saved Successfully');
        const rowToDelete = this.dataSource.data.findIndex(e => e.id === selectedRow.id);
        if (rowToDelete !== -1) {
          this.dataSource.data.splice(rowToDelete, 1);
          this.dataSource._updateChangeSubscription();
        }
      })
  }


}
