import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartBillMetadata } from '../../part-bill.configuration';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { SpecificationRegistrationMetadata } from 'src/app/modules/prebudget/components/specification-registration/specification-registration.configuration';
import { ProjectSpecificationMetadata } from 'src/app/modules/prebudget/components/project-specification/project-specification.configuration';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-select-specification',
  templateUrl: './select-specification.component.html',
  styleUrls: ['./select-specification.component.css']
})
export class SelectSpecificationComponent implements OnInit {

  tableColumns;
  dataSource;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<SelectSpecificationComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar
  ) {
    this.tableColumns = PartBillMetadata.selectSpecTableColumn;
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

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataHandler.get<any[]>(this.serviceUrl)
      .subscribe((res: any[]) => {
        if(res && res.length){
          res.forEach(e=> e.scheduledQty = e.quantityRequired || 1);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
        }else{
          this.snackbar.open('No data');
        }
      });
  }

  get serviceUrl() {
    const user = this.authService.loggedInUser;
    let endPoint;
    switch (this.data.billType) {
      case 1:
        endPoint = `BuildExeCRM/api/SpecificationList/${user.companyId}/${user.branchId}`;
        break;
      case 2:
        endPoint = `${ProjectSpecificationMetadata.serviceEndPoint}List/${this.data.projectId}/${this.data.unitId}/${this.data.blockId}/${this.data.floorId}`
        break;
      default:
        endPoint = `BuildExeCRM/api/SpecificationList/${user.companyId}/${user.branchId}`;
        break;
    }
    return endPoint;
  }

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
