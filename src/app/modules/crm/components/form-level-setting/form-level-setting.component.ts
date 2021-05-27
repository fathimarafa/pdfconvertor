import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { FormLevelSettingEditComponent } from './edit/form-level-setting-edit.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { FormLevelSettingMetadata } from './form-level-setting.configuration';
import { FormLevelSetting } from './definitions/form-level-setting.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-form-level-setting',
  templateUrl: './form-level-setting.component.html',
  styleUrls: ['./form-level-setting.component.css']
})
export class FormLevelSettingComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService
  ) {
    this.module = FormLevelSettingMetadata;
    this.tableColumns = this.module.tableColumns;
    this.fetchApprovalMenu();
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() { }

  fetchApprovalMenu() {
    this.dataHandler.get(this.module.serviceEndPoint.getMenuWithApproval)
      .subscribe((res: any[]) => {
        this.fetchLevel(res);
      });
  }

  fetchLevel(approvalMenu) {
    this.dataHandler.get<FormLevelSetting[]>(this.module.serviceEndPoint.level)
      .subscribe((res: FormLevelSetting[]) => {
        const data = [];
        approvalMenu.forEach((menu) => {
          const levelSetting = res.find(e => e.menuId === menu.menuId);
          let formlevel = levelSetting ? levelSetting.formlevel || 0 : 0;
          data.push(
            {
              menuId: menu.menuId,
              menuName: menu.menuName,
              formlevel,
              companyId: this.authService.loggedInUser.companyId,
              branchId: this.authService.loggedInUser.companyId
            }
          )
        });
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  onEditBtnClick(rowToEdit?: FormLevelSetting) {
    this.dialogEventHandler.openDialog(
      FormLevelSettingEditComponent,
      this.dataSource,
      this.dataSource.data,
      this.affectedRowIndex(rowToEdit)
    )
  }

  private affectedRowIndex(rowToEdit?: FormLevelSetting): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: FormLevelSetting) => row.id === rowToEdit.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}