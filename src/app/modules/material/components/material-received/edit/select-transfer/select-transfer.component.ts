import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MaterialTransferRequest } from '../../../material-transfer-request/definitions/material-transfer-request.definition';
import { MaterialTransferRequestMetadata } from '../../../material-transfer-request/material-transfer-request.configuration';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-select-transfer',
  templateUrl: './select-transfer.component.html',
  styleUrls: ['./select-transfer.component.css']
})
export class SelectTransferComponent implements OnInit {

  tableColumns;
  dataSource;

  selection = new SelectionModel<MaterialTransferRequest>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<SelectTransferComponent>,
    @Inject(MAT_DIALOG_DATA) private tableRows: MaterialTransferRequest[]
  ) {
    this.tableColumns = MaterialTransferRequestMetadata.tableColumns;
    this.dataSource = new MatTableDataSource(this.tableRows);
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      const columns = this.tableColumns.map(col => col.field);
      const actionIndex = columns.findIndex((col: string) => col === 'action');
      columns.splice(actionIndex, 1);
      columns.push('select');
      return columns;
    } else {
      return [];
    }
  }

  ngOnInit() { }

  isAllSelected() {
    const totalSelected = this.selection.selected.length;
    const totalRows = this.dataSource.data.length;
    return totalSelected === totalRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onOkBtnClick() {
    let transferDetails = [];
    this.selection.selected.forEach((e: MaterialTransferRequest) => transferDetails = transferDetails.concat(e.transferDetail));
    this.dialogRef.close(transferDetails);
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}