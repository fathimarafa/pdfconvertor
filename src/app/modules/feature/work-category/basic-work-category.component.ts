import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../services/dialog-event-handler/dialogeventhandler.service';
import { BasicWorkCategory } from './definitions/basic-work-category.definition';
import { BasicWorkCategoryMetadata } from './basic-work-category.configuration';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basic-work-category',
  templateUrl: './basic-work-category.component.html',
  styleUrls: ['./basic-work-category.component.css']
})
export class BasicWorkCategoryComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  form = new FormGroup({});
  model: BasicWorkCategory;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  showAddEditForm:boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private snackBar: MatSnackBar
  ) {
    this.module = BasicWorkCategoryMetadata;
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
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<BasicWorkCategory[]>(`${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: BasicWorkCategory[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onAddEditBtnClick(rowToEdit?: BasicWorkCategory) {
    this.showAddEditForm = true;
    this.isEdit = rowToEdit ? true : false;
    this.model = Object.assign({}, rowToEdit)
  }

  onCancelBtnClick() {
    this.isEdit = false;
    this.showAddEditForm = false;
    this.form.reset();
  }

  openDeleteDialog(rowToDelete: BasicWorkCategory): void {
    const dummyUserId = 1;
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.id}/${dummyUserId}`,
      deleteUid: rowToDelete.id
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(affectedRow?: BasicWorkCategory) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: BasicWorkCategory) => row.id === affectedRow.id);
    }
    return indexToUpdate;
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

  get httpRequest(): Observable<BasicWorkCategory> {
    if (this.isEdit) {
      return this.dataHandler.put<BasicWorkCategory>(this.module.serviceEndPoint, this.model);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, userId: 0
      }
      const payloads = { ...dummyDefaultFields, ...this.model };
      return this.dataHandler.post<BasicWorkCategory>(this.module.serviceEndPoint, payloads);
    }
  }

}