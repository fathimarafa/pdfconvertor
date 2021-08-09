import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { SubcontractorlabourgroupaAttendance } from '../subcontractor-labour-groupattendancesetting/definitions/subcontractor-labour-groupattendancesetting.definition';
import { SubcontractorlabourgroupattendanceEditComponent } from '../subcontractor-labour-groupattendancesetting/edit/subcontractor-labour-groupattendancesetting-edit.component';
import { SubcontractorBulkApprovalMetadata} from 'src/app/modules/hr/components/subcontractor-attendance-bulk-approval/subcontractor-attendance-bulk-approval.configuration';

@Component({
  selector: 'app-subcontractor-attendance-bulk-approval',
  templateUrl: './subcontractor-attendance-bulk-approval.component.html',
  styleUrls: ['./subcontractor-attendance-bulk-approval.component.css']
})
export class SubcontractorAttendanceBulkApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  selection = new SelectionModel<SubcontractorlabourgroupaAttendance>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.module = SubcontractorBulkApprovalMetadata;
    this.tableColumns = this.module.tableColumns
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      const columns = this.tableColumns.map(col => col.field);
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
    this.dataHandler.get<SubcontractorlabourgroupaAttendance[]>(this.approvalServiceUrl)
      .subscribe((res: SubcontractorlabourgroupaAttendance[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }
  
  
  get approvalServiceUrl() {
    let user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
  }
  

  openApproveRemarkDialog(isApproved: boolean): void {
    if (!this.selection.selected.length) {
      const message = 'WARNING : Please select an item';
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
    const subscriptionArray = this.selection.selected.map(selectedItem => {
      isApproved ? selectedItem.approvalLevel++ : selectedItem.approvalLevel--;
      selectedItem.approvedBy = this.authService.loggedInUser.userId;
      return this.dataHandler.put<SubcontractorlabourgroupaAttendance>(this.module.serviceEndPoint, [selectedItem])
    });
    forkJoin(subscriptionArray).subscribe((res) => {
      this.snackBar.open(`Supplier Advance ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      this.selection.selected.forEach(item => {
        const rowToRemove = this.dataSource.data.findIndex(e => e.id === item.id);
        if (rowToRemove !== -1) {
          this.dataSource.data.splice(rowToRemove, 1);
        }
      })
      this.dataSource._updateChangeSubscription();
    })
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openEditDialog(rowToEdit?: SubcontractorlabourgroupaAttendance) {
    this.dialogEventHandler.openDialog(
      SubcontractorlabourgroupattendanceEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(affectedRow?: SubcontractorlabourgroupaAttendance) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: SubcontractorlabourgroupaAttendance) => row.id === affectedRow.id);
    }
    return indexToUpdate;
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


}