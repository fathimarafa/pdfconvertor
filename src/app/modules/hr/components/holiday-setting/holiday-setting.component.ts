import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { HolidaySetting } from './definitions/holiday-setting';
import { HolidaySettingMetadata } from './holiday-setting.configuration';
import { HolidaySettingEditComponent } from './edit/holiday-setting-edit.component';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-holiday-setting',
  templateUrl: './holiday-setting.component.html',
  styleUrls: ['./holiday-setting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HolidaySettingComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: new Date('2021-07-05'),
      end: new Date('2021-07-07'),
      title: 'A 3 day event',
      color: colors.blue,
      allDay: true,
      meta: {
        incrementsBadgeTotal: false,
      },
    },
  ];

  activeDayIsOpen: boolean = true;

  dayClicked(date) {
    console.log(date);
    this.openDialog();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  module;
  tableColumns;
  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authenticationService: AuthenticationService
  ) {
    this.module = HolidaySettingMetadata;
    this.tableColumns = this.module.tableColumns;
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map((col) => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const user = this.authenticationService.loggedInUser;
    this.dataHandler
      .get<HolidaySetting[]>(
        this.module.serviceEndPoint + `/${user.companyId}/${user.branchId}`
      )
      .subscribe((res: HolidaySetting[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog() {
    this.dialogEventHandler.openDialog(
      HolidaySettingEditComponent,
      this.dataSource,
      {}
      // this.affectedRowIndex(rowToEdit)
    );
  }

  openDeleteDialog(rowToDelete: HolidaySetting): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.FinancialYearId}`,
      deleteUid: rowToDelete.FinancialYearId,
    };
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    );
  }

  private affectedRowIndex(affectedRow?: HolidaySetting) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex(
        (row: HolidaySetting) =>
          row.FinancialYearId === affectedRow.FinancialYearId
      );
    }
    return indexToUpdate;
  }
}
