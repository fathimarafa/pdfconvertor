import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { EnquiryReportMetadata } from './enquiry-report.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { ReportsConfigurationMetadata } from '../report-configuration/report-configuration.configuration';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { SidebarMenu } from 'src/app/modules/common/sidebar/definitions/sidebar.definition';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfExportService, PdfExportSettings } from 'src/app/services/pdf-export/pdf-export.service';

@Component({
  selector: 'app-enquiry-report',
  templateUrl: './enquiry-report.component.html',
  styleUrls: ['./enquiry-report.component.css']
})
export class EnquiryReportComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  module;
  tableColumns;
  dataSource;
  navData: SidebarMenu = {};
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar,
    private pdfExportService: PdfExportService
  ) {
    this.module = EnquiryReportMetadata;
    this.navData = this.router.getCurrentNavigation().extras.state;
    if (this.navData) {
      sessionStorage.setItem("nav-session", JSON.stringify(this.navData));
    } else {
      const navDetails = sessionStorage.getItem('nav-session')
      if (navDetails) {
        this.navData = JSON.parse(navDetails);
      }
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.loadReportConfiguration();
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
    return `${ReportsConfigurationMetadata.serviceEndPoint.report_config}/${this.navData.menuId}/${user.companyId}/${user.branchId}`;
  }

  loadFields() {

  }

  fetchData() {
    const endpoint = `${EnquiryReportMetadata.serviceEndPoint.baseUrl}${EnquiryReportMetadata.serviceEndPoint[this.navData.menuId]}`;
    // 'BuildExeCRM/api/EnquiryList';
    console.log('model', this.model);
    const data = this.model;
    // { "ModeOfEnquiryId": 1, "FromDate": "2020-01-05", "ToDate": "2020-12-05", "ReminderDate": "2021-01-01", "EnquiryStatusId": 1, "EnquiryForId": 4, "AssignStaffId": 2, "MarketingteamId": 1, "companyId": 1, "branchId": 2 }
    this.dataHandler.post(endpoint, data)
      .subscribe((res: any[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  private loadReportFields(selectedFields: number[]) {
    const endpoint = `${ReportsConfigurationMetadata.serviceEndPoint.report_fields}/${this.navData.menuId}`;
    this.dataHandler.get(endpoint).subscribe((res: any) => {
      if (selectedFields && selectedFields.length) {
        res.forEach((e) => {

          if (res && res.length) {

            if (selectedFields.includes(e.id)) {
              if (!this.tableColumns) {
                this.tableColumns = [];
              }
              this.tableColumns.push({
                "field": e.fieldName.charAt(0).toLowerCase() + e.fieldName.slice(1),
                "displayName": e.fieldName
              });

            }

          } else {
            this.snackbar.open('Warning : Please configure report fields', null, { panelClass: 'snackbar-error-message' });
          }

        });
      }
    });
  }

  private loadReportFilters(selectedFilters: number[]) {
    const endpoint = `${ReportsConfigurationMetadata.serviceEndPoint.report_filters}/${this.navData.menuId}`;
    this.dataHandler.get(endpoint).subscribe((res: any) => {

      if (res && res.length) {

        if (selectedFilters && selectedFilters.length) {
          res.forEach((e) => {
            if (selectedFilters.includes(e.id)) {

              const formFieldGroup = {
                "fieldGroupClassName": "display-flex",
                "fieldGroup": []
              }

              const formField = this.generateFormField(e);

              if (!this.fields) {

                this.fields = [];
                formFieldGroup.fieldGroup.push(formField);
                this.fields.push(formFieldGroup);

              } else {

                const lastIndex = this.fields.length - 1;
                const fieldGroupLen = this.fields[lastIndex].fieldGroup.length

                if (fieldGroupLen === 3) {

                  formFieldGroup.fieldGroup.push(formField);
                  this.fields.push(formFieldGroup);

                } else {

                  this.fields[lastIndex].fieldGroup.push(formField)

                }

              }

            }
          });
        }

      } else {

        this.snackbar.open('Warning : Please configure filters', null, { panelClass: 'snackbar-error-message' });

      }


    });
  }

  generateFormField(e) {
    const type = e.filterType.toLowerCase();
    switch (type) {
      case 'combo':
        return {
          "className": "flex-1",
          "type": "input",
          "key": e.searchField,
          "templateOptions": {
            "label": e.filterFields,
          }
        }
      case 'date':
        return {
          "className": "flex-1",
          "type": "datepicker",
          "key": e.searchField,
          "templateOptions": {
            "label": e.filterFields,
          }
        }
      default:
        return {
          "className": "flex-1",
          "type": "input",
          "key": e.searchField,
          "templateOptions": {
            "label": e.filterFields,
          }
        }
    }
  }

  onLoadDataBtnClick() {
    this.fetchData();
  }

  onDownloadBtnClick() {
    if (this.dataSource.data && this.dataSource.data.length) {
      const data: PdfExportSettings = {
        title: this.navData.menuName,
        tableColumns: this.tableColumns,
        tableRows: this.dataSource.data
      }
      this.pdfExportService.download(data);
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem('nav-session');
  }

}