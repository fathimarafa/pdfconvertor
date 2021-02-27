import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../services/dialog-event-handler/dialogeventhandler.service';
import { HolidaySetting } from './definitions/holiday-setting';
import { HolidaySettingMetadata } from './holiday-setting.configuration';

@Component({
  selector: 'app-holiday-setting',
  templateUrl: './holiday-setting.component.html',
  styleUrls: ['./holiday-setting.component.css']
})
export class HolidaySettingComponent implements OnInit {

  module;
  tableColumns;
  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService
  ) {
    this.module = HolidaySettingMetadata;
    this.tableColumns = this.module.tableColumns
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataHandler.get<HolidaySetting[]>(this.module.serviceEndPoint)
      .subscribe((res: HolidaySetting[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

}
