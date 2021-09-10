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

@Component({
  selector: 'app-enquiry-report',
  templateUrl: './enquiry-report.component.html',
  styleUrls: ['./enquiry-report.component.css']
})
export class EnquiryReportComponent implements OnInit {

  form = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  selectedMenuId = 10051;
  module;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService
  ) {
    this.module = EnquiryReportMetadata;
    // this.tableColumns = this.module.tableColumns
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
    return `${ReportsConfigurationMetadata.serviceEndPoint.report_config}/${this.selectedMenuId}/${user.companyId}/${user.branchId}`;
  }

  loadFields() {

  }

  fetchData() {
    this.dataHandler.get(this.module.serviceEndPoint)
      .subscribe((res: any[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  private loadReportFields(selectedFields: number[]) {
    const endpoint = `${ReportsConfigurationMetadata.serviceEndPoint.report_fields}/${this.selectedMenuId}`;
    this.dataHandler.get(endpoint).subscribe((res: any) => {
      if (selectedFields && selectedFields.length) {
        res.forEach((e) => {
          if (selectedFields.includes(e.id)) {
            if (!this.tableColumns) {
              this.tableColumns = [];
            }
            this.tableColumns.push({
              "field": e.fieldName,
              "displayName": e.fieldName
            });
          }
        });
      }
    });
  }

  private loadReportFilters(selectedFilters: number[]) {
    const endpoint = `${ReportsConfigurationMetadata.serviceEndPoint.report_filters}/${this.selectedMenuId}`;
    this.dataHandler.get(endpoint).subscribe((res: any) => {
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

}