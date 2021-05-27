import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { MaterialQuotationApprovalMetadata } from './material-quotation-approval.configuration';
import { MaterialIndentCreationMetadata } from '../material-indent-creation/material-indent-creation.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialQuotation } from '../material-quotation/definitions/material-quotation.definition';
import { QuotationBaseRateFeedingMetadata } from '../quotation-base-rate-feeding/quotation-base-rate-feeding.configuration';
import { QuotationBaseRateFeeding } from '../quotation-base-rate-feeding/definitions/quotation-base-rate-feeding.definition';

@Component({
  selector: 'app-material-quotation-approval',
  templateUrl: './material-quotation-approval.component.html',
  styleUrls: ['./material-quotation-approval.component.css']
})
export class MaterialQuotationApprovalComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  itemTableColumns;
  itemDatasource;
  selectedQuotation: MaterialQuotation;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.module = MaterialQuotationApprovalMetadata;
    this.tableColumns = this.module.tableColumns
    this.itemTableColumns = this.module.itemDetailstableColumns;
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  get itemDataColumns() {
    if (this.itemTableColumns && this.itemTableColumns.length) {
      return this.itemTableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const user = this.authService.loggedInUser;
    const endpoint = `${this.module.serviceEndPoint}/${user.companyId}/${user.branchId}`
    this.dataHandler.get<MaterialQuotation[]>(endpoint)
      .subscribe((res: MaterialQuotation[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onApproveBtnClick() {
    if (!this.selectedQuotation) {
      this.snackBar.open('WARNING :  Please select a quotation');
      return;
    }
    // this.selectedQuotation.approvalLevel++;
    // this.selectedQuotation.approvedBy = this.authService.loggedInUser.userId;
    // this.selectedQuotation.approvedDate = new Date();
    this.dataHandler.put<MaterialQuotation>(MaterialIndentCreationMetadata.serviceEndPoint, [this.selectedQuotation]).subscribe((res) => {
      this.snackBar.open('Quotation Approved Successfully');
      const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedQuotation.id);
      if (rowToRemove !== -1) {
        this.dataSource.data.splice(rowToRemove, 1);
        this.dataSource._updateChangeSubscription();
        this.itemDatasource.data = [];
        this.itemDatasource._updateChangeSubscription();
      }
    })
  }

  onRejectBtnClick() {
    if (!this.selectedQuotation) {
      this.snackBar.open('WARNING :  Please select a quotation');
      return;
    }
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onRowSelection(selected: MaterialQuotation) {
    this.selectedQuotation = selected;
    this.dataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    this.fetchBaseRate();
  }

  fetchBaseRate() {
    this.dataHandler.get<QuotationBaseRateFeeding[]>(this.baseRateServiceUrl)
      .subscribe((res: QuotationBaseRateFeeding[]) => {
        const rows = res.filter(e => e.quotationId === this.selectedQuotation.id);
        rows.sort((a, b) => a.baseRate > b.baseRate ? 1 : -1);
        this.itemDatasource = new MatTableDataSource(rows);
      });
  }

  get baseRateServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${QuotationBaseRateFeedingMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

}