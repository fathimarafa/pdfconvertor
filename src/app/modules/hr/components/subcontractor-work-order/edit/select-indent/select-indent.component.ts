import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Indent, IndentDetails } from '../../../subcontractor-indent/definition/subcontractor-indent.definition';
import { SubcontractorIndentMetadata } from '../../../subcontractor-indent/subcontractor-indent.configuration';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';
import { ConfirmModalComponent } from 'src/app/modules/common/confirm-modal/confirm-modal.component';
import { MaterialIndent } from 'src/app/modules/material/components/material-indent-creation/definitions/material-indent-creation.definiton';
import { MaterialIndentCreationMetadata } from 'src/app/modules/material/components/material-indent-creation/material-indent-creation.configuration';
import { SubContractorWorkOrder } from '../../definitions/subcontractor-work-order.definition';
import { SubcontractorWorkOrderMetadata } from '../../subcontractor-work-order.configuration';



@Component({
  selector: 'app-select-indent',
  templateUrl: './select-indent.component.html',
  styleUrls: ['./select-indent.component.css']
})
export class SelectIndentComponent implements OnInit {

// module;
// tableColumns;
// dataSource;
// selection = new SelectionModel<Indent>(true, []);
// @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 

// constructor(
//   private dialogRef: MatDialogRef<SelectIndentComponent>,
//  @Inject(MAT_DIALOG_DATA) private tableRows:Indent[],
//   private dataHandler: DataHandlerService,
//   private dialogEventHandler: DialogEventHandlerService,
//   private pdfExportService: PdfExportService,
//   private dialog: MatDialog
// ) {
//   this.module = SubcontractorIndentMetadata ;
//   this.tableColumns = this.module.tableColumns
// }

// get dataColumns() {
//   if (this.tableColumns && this.tableColumns.length) {
//     return this.tableColumns.map(col => col.field);
//   } else {
//     return [];
//   }
// }

// ngOnInit() {
//   this.fetchData();
// }

// fetchData() {
//   const dummyCompanyId = 1; const dummyBranchId = 0;
//   this.dataHandler.get<Indent[]>(`${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
//     .subscribe((res: Indent[]) => {
//       this.dataSource = new MatTableDataSource(res);
//       this.dataSource.paginator = this.paginator;
//     });
// }


// openDeleteDialog(rowToDelete: Indent): void {
//   const dummyUserId = 1;
//   const dataToComponent = {
//     endPoint: `${this.module.serviceEndPoint}/${rowToDelete.id}/${dummyUserId}`,
//     deleteUid: rowToDelete.id
//   }
//   this.dialogEventHandler.openDialog(
//     ConfirmModalComponent,
//     this.dataSource,
//     dataToComponent,
//     this.affectedRowIndex(rowToDelete)
//   )
// }

// private affectedRowIndex(affectedRow?: Indent) {
//   let indexToUpdate;
//   if (affectedRow) {
//     indexToUpdate = this.dataSource.data.findIndex((row: Indent) => row.id === affectedRow.id);
//   }
//   return indexToUpdate;
// }

// doFilter(value: string) {
//   this.dataSource.filter = value.trim().toLocaleLowerCase();
// }

// onDownloadBtnClick() {
//   const data: PdfExportSettings = {
//     title: 'material issue',
//     tableColumns: this.tableColumns,
//     tableRows: this.dataSource.data
//   }
//   this.pdfExportService.download(data);
// }

// isAllSelected() {
//       const totalSelected = this.selection.selected.length;
//       const totalRows = this.dataSource.data.length;
//       return totalSelected === totalRows;
//     }
  
//     masterToggle() {
//       this.isAllSelected() ?
//         this.selection.clear() :
//         this.dataSource.data.forEach(row => this.selection.select(row));
//     }
  
//     onOkBtnClick() {
//       this.dialogRef.close(this.selection.selected);
//     }

//     onCancelBtnClick() {
//       this.dialogRef.close();
//     }

// }

  module;
  tableColumns;
  dataSource;
  selection = new SelectionModel<Indent>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<SelectIndentComponent>,
    @Inject(MAT_DIALOG_DATA) private tableRows: Indent[],
    private dataHandler: DataHandlerService

  ) {
   
    this.tableColumns = SubcontractorWorkOrderMetadata.subContractorWorkOrderDetails.tableColumns;
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

  ngOnInit() {
  this.fetchData();
}

fetchData() {
  const dummyCompanyId = 1003; 
        this.dataHandler.get<SubContractorWorkOrder[]>(`${'BuildExeHR/api/Indent'}/${dummyCompanyId}`)
          .subscribe((res: SubContractorWorkOrder[]) => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
    });
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