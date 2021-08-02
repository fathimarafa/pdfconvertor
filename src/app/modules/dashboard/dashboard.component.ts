import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { DashboardMetadata } from './dashboard.configuration';
import { Dashboard } from './definitions/dashboard.definition';
import { SideNavigationMenu } from './../common/sidebar/sidebar.configuration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  module;
  tableColumns;
  dataSource;
  pendingApprovals;
  pendingApprovalsLength: number = 0;
  accountsReminders;
  accountsRemindersLength: number = 0;
  pendingReminders;
  pendingRemindersLength: number = 0;
  taskPending;
  taskPendingLength: number = 0;

  constructor(
    private dataHandler: DataHandlerService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.module = DashboardMetadata;
    this.tableColumns = this.module.tableColumns;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map((col) => col.field);
    } else {
      return [];
    }
  }

  fetchData() {
    let date = new Date();
    const today = [
      `${date.getFullYear()}`,
      `0${date.getMonth()}`.substr(-2),
      `0${date.getDate()}`.substr(-2),
    ].join('-');

    const user = this.authenticationService.loggedInUser;
    this.dataHandler
      .get<Dashboard[]>(
        `${DashboardMetadata.serviceEndPoint}/${user.userId}/${today}/${user.companyId}/${user.branchId}`
      )
      .subscribe((res: any) => {
        const data = res;

        this.pendingApprovals = new MatTableDataSource(
          data.filter((x) => x.alertType === 1)
        );
        this.pendingApprovalsLength = data.filter(
          (x) => x.alertType === 1
        ).length;

        this.accountsReminders = new MatTableDataSource(
          data.filter((x) => x.alertType === 2)
        );
        this.accountsRemindersLength = data.filter(
          (x) => x.alertType === 2
        ).length;

        this.pendingReminders = new MatTableDataSource(
          data.filter((x) => x.alertType === 3)
        );
        this.pendingRemindersLength = data.filter(
          (x) => x.alertType === 3
        ).length;

        this.taskPending = new MatTableDataSource(
          data.filter((x) => x.alertType === 4)
        );
        this.taskPendingLength = data.filter((x) => x.alertType === 4).length;
      });
  }

  onclickApprove(data) {
    let route = '';
    for (let x in SideNavigationMenu) {
      if (SideNavigationMenu[x].menuId === data.menuId) {
        if (SideNavigationMenu[x].route !== '') {
          route = SideNavigationMenu[x].route;
          this.router.navigateByUrl('/home' + route);
          return;
        }
      }
    }
  }
}
