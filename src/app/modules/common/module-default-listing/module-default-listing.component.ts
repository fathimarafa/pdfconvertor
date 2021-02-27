import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ServerCommunicationService } from '../../../services/server-communication/server.communication.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ModuleDefaultFormMultistepComponent } from '../module-default-form-multistep/module-default-form-multistep.component';
import { ModuleDefaultFormComponent } from '../module-default-form/module-default-form.component';

@Component({
  selector: 'app-module-default-listing',
  templateUrl: './module-default-listing.component.html',
  styleUrls: ['./module-default-listing.component.css']
})
export class ModuleDefaultListingComponent implements OnInit {

  tableColumns;
  dataSource;
  @Input() moduleMetadata;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private serverCommunication: ServerCommunicationService
  ) {
    this.tableColumns = [];
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.tableColumns = this.moduleMetadata.tableColumns;
    this.loadData();
  }

  loadData() {
    this.serverCommunication.fetchData().then(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog() {
    const formComponent: any = this.moduleMetadata.useMultiStepForm ? ModuleDefaultFormMultistepComponent : ModuleDefaultFormComponent;
    const editDialogRef = this.dialog.open(formComponent);
    editDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteDialog() {
    const deletedialogRef = this.dialog.open(ConfirmModalComponent);
    deletedialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
