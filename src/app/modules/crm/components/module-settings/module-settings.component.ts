import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { ModuleSettingsMetadata } from './module-settings.configuration';
import { ModuleSettings } from './definitions/module-settings.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { SideNavbarMetadata } from 'src/app/modules/common/sidebar/sidebar.configuration';
import { SidebarMenu } from 'src/app/modules/common/sidebar/definitions/sidebar.definition';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-module-settings',
  templateUrl: './module-settings.component.html',
  styleUrls: ['./module-settings.component.css']
})
export class ModuleSettingsComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  userSelection = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.module = ModuleSettingsMetadata;
    this.tableColumns = this.module.tableColumns;
    this.fetchModuleSettings()

  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() { }

  fetchModuleSettings() {
    this.dataHandler.get(this.module.serviceEndPoint)
      .subscribe((res: any[]) => {
        this.dataSource = new MatTableDataSource(res);
      });
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onSaveBtnClick() {
    if (this.userSelection && this.userSelection.length) {
      this.userSelection.forEach((data, index) => {
        this.dataHandler.put(this.module.serviceEndPoint, data).subscribe(res => {
          this.userSelection = [];
          if ((index + 1) === this.userSelection.length) {
            this.snackBar.open('Data Saved Successfully');
          }
        })
      })
    }
  }

  onSelection(row) {
    const index = this.userSelection.findIndex(e => e.menuId === row.menuId);
    if (index === -1) {
      this.userSelection.push({
        menuId: row.menuId,
        isActive: row.isActive ? 0 : 1
      })
    } else {
      this.userSelection.splice(index, 1)
    }
  }

}