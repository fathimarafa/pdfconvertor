import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { ReportsConfigurationMetadata } from './report-configuration.configuration';

@Component({
  selector: 'app-report-configuration',
  templateUrl: './report-configuration.component.html',
  styleUrls: ['./report-configuration.component.css']
})
export class ReportConfigurationComponent implements OnInit {

  reportMenu;
  reportFields;
  reportFilters;
  module;
  selectedMenuId;

  constructor(
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.module = ReportsConfigurationMetadata;
    this.loadReportMenu();
  }

  private loadReportMenu() {
    const endpoint = this.module.serviceEndPoint.report_menu;
    this.dataHandler.get(endpoint).subscribe(res => this.reportMenu = res);
  }

  onMenuSelection(menuId: number) {
    this.selectedMenuId = menuId;
    this.loadReportConfiguration();
  }

  private loadReportFields(selectedFields: number[]) {
    const endpoint = `${this.module.serviceEndPoint.report_fields}/${this.selectedMenuId}`;
    this.dataHandler.get(endpoint).subscribe((res: any) => {
      if (selectedFields && selectedFields.length) {
        res.forEach((e) => {
          if (selectedFields.includes(e.id)) {
            e.selected = true;
          }
        });
      }
      this.reportFields = res;
    });
  }

  private loadReportFilters(selectedFilters: number[]) {
    const endpoint = `${this.module.serviceEndPoint.report_filters}/${this.selectedMenuId}`;
    this.dataHandler.get(endpoint).subscribe((res: any) => {
      if (selectedFilters && selectedFilters.length) {
        res.forEach((e) => {
          if (selectedFilters.includes(e.id)) {
            e.selected = true;
          }
        });
      }
      this.reportFilters = res;
    });
  }

  private loadReportConfiguration() {
    const endpoint = this.reportconfigServiceUrl();
    this.dataHandler.get(endpoint).subscribe((res) => {
      let selectedFields, selectedFilters;
      if (res && res[0]) {
        selectedFields = res[0].configurationFieldDetails.map(e => e.reportFieldId);
        selectedFilters = res[0].configurationFilterDetails.map(e => e.reportFilterId);
      }
      this.loadReportFields(selectedFields);
      this.loadReportFilters(selectedFilters);
    });
  }

  private reportconfigServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${this.module.serviceEndPoint.report_config}/${this.selectedMenuId}/${user.companyId}/${user.branchId}`;
  }

  onSaveBtnClick() {
    const payload = {
      menuId: this.selectedMenuId,
      configurationFieldDetails: this.reportFields.filter(e => e.selected).map(e => {
        return { reportFieldId: e.id }
      }),
      configurationFilterDetails: this.reportFields.filter(e => e.selected).map(e => {
        return { reportFilterId: e.id }
      }),
    }
    this.dataHandler.post(this.module.serviceEndPoint.report_config, [payload]).subscribe(res => {
      this.snackBar.open('Data Saved Successfully');
    })
  }

}
