import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../services/datahandler/datahandler.service';
import { BasicFinancialYear } from './definitions/financial-year.definition';
import { BasicFinancialYearRegistrationMetadata } from './basic-financial-year-registration.configuration';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basic-financial-year-registration',
  templateUrl: './basic-financial-year-registration.component.html',
  styleUrls: ['./basic-financial-year-registration.component.css']
})
export class BasicFinancialYearRegistrationComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  form = new FormGroup({});
  model: BasicFinancialYear;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  showAddEditForm: boolean;
  financialYearStatus = ['Active', 'Closing', 'Closed'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private snackBar: MatSnackBar
  ) {
    this.module = BasicFinancialYearRegistrationMetadata;
    this.tableColumns = this.module.tableColumns
    this.fields = this.module.formFields;
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
    this.dataHandler.get<BasicFinancialYear[]>(this.module.serviceEndPoint)
      .subscribe((res: BasicFinancialYear[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onAddEditBtnClick(rowToEdit?: BasicFinancialYear) {
    this.showAddEditForm = true;
    this.isEdit = rowToEdit ? true : false;
    this.model = Object.assign({}, rowToEdit)
  }

  onCancelBtnClick() {
    this.isEdit = false;
    this.showAddEditForm = false;
    this.form.reset();
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
        this.onCancelBtnClick();
      });
    }
  }

  get httpRequest(): Observable<BasicFinancialYear> {
    this.model.financial_Year = `${new Date(this.model.start_date).getFullYear()}-${new Date(this.model.end_date).getFullYear()}`
    if (this.isEdit) {
      return this.dataHandler.put<BasicFinancialYear>(this.module.serviceEndPoint, this.model);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, userId: 0
      }
      const payloads = { ...dummyDefaultFields, ...this.model };
      return this.dataHandler.post<BasicFinancialYear>(this.module.serviceEndPoint, payloads);
    }
  }

  onStatusChanged(row: BasicFinancialYear) {
    this.dataHandler.put<BasicFinancialYear>(this.module.serviceEndPoint, row)
      .subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
      });
  }

}