import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MaterialTransferRequest } from '../../../material-transfer-request/definitions/material-transfer-request.definition';
import { MaterialTransferRequestMetadata } from '../../../material-transfer-request/material-transfer-request.configuration';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialIndentCreationMetadata } from '../../../material-indent-creation/material-indent-creation.configuration';
import { MaterialIndent } from '../../../material-indent-creation/definitions/material-indent-creation.definiton';


@Component({
  selector: 'app-select-indent-approval',
  templateUrl: './select-indent-approval.component.html',
  styleUrls: ['./select-indent-approval.component.css']
})
export class SelectIndentApprovalComponent implements OnInit {

  tableColumns;
  dataSource;
  selection = new SelectionModel<MaterialIndent>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<SelectIndentApprovalComponent>,
    @Inject(MAT_DIALOG_DATA) private tableRows: MaterialIndent[]
  ) {
    this.tableColumns = MaterialIndentCreationMetadata.tableColumns;
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
    this.dialogRef.close(this.selection.selected);
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
