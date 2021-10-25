import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { MaterialStockEntryEditComponent } from './edit/material-stock-entry-edit.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialStockEntryMetadata } from './material-stock-entry.configuration';
import { MaterialStockEntry } from './definitions/material-stock-entry.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { Router } from '@angular/router';
import { SideNavigationMenu } from 'src/app/modules/common/sidebar/sidebar.configuration';

@Component({
  selector: 'app-material-stock-entry',
  templateUrl: './material-stock-entry.component.html',
  styleUrls: ['./material-stock-entry.component.css']
})
export class MaterialStockEntryComponent implements OnInit {


  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private dialogEventHandler: DialogEventHandlerService,
    private router: Router
  ) {
    this.module = MaterialStockEntryMetadata;
    this.module.displayName = this.isDirectEntry ? 'Material / Direct Stock Entry' : 'Material / Stock Entry';
    this.tableColumns = this.module.tableColumns
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  get isDirectEntry() {
    return this.router.url.includes('directstockentry');
  }

  ngOnInit() {
    this.fetchData();
  }

  get menuId() {
    const urlHashArray = this.router.url.split('/');
    const endUrl = urlHashArray[urlHashArray.length - 1];
    for (let x in SideNavigationMenu) {
      if (SideNavigationMenu[x].route === `/${endUrl}`) {
        return SideNavigationMenu[x].menuId;
      }
    }
  }

  fetchData() {
    let user = this.authService.loggedInUser;
    let endPoint = `BuildExeMaterial/api/PurchaseList/${user.companyId}/${user.branchId}/${user.userId}/${this.menuId}`;
    this.dataHandler.get<MaterialStockEntry[]>(endPoint)
      // (this.serviceEndpoint)
      .subscribe((res: MaterialStockEntry[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceEndpoint() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint}List/${user.companyId}/${user.branchId}`;
  }

  openDialog(rowToEdit?: MaterialStockEntry) {
    this.dialogEventHandler.openDialog(
      MaterialStockEntryEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }


  openDeleteDialog(rowToDelete: MaterialStockEntry): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.id}/${this.authService.loggedInUser.userId}`,
      deleteUid: rowToDelete.id
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(rowToEdit?: MaterialStockEntry): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: MaterialStockEntry) => row.id === rowToEdit.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}