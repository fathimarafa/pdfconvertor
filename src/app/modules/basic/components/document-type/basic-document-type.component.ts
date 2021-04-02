import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { BasicDocumentType } from './definitions/basic-document-type.definition';
import { BasicDocumentTypeMetadata } from './basic-document-type.configuration';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DocumentGroupMetadata } from '../document-group/document-group.configuration';
import { DocumentGroup } from '../document-group/definitions/document-group.definition';

@Component({
  selector: 'app-basic-document-type',
  templateUrl: './basic-document-type.component.html',
  styleUrls: ['./basic-document-type.component.css']
})
export class BasicDocumentTypeComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  form = new FormGroup({});
  model: BasicDocumentType;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  showAddEditForm: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private snackBar: MatSnackBar
  ) {
    this.module = BasicDocumentTypeMetadata;
    this.tableColumns = this.module.tableColumns
    this.fields = this.module.formFields;
    this.loadDocumentGroupDropdown();
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
    this.dataHandler.get<BasicDocumentType[]>(`${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: BasicDocumentType[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onAddEditBtnClick(rowToEdit?: BasicDocumentType) {
    this.showAddEditForm = true;
    this.isEdit = rowToEdit ? true : false;
    this.model = Object.assign({}, rowToEdit)
  }

  onCancelBtnClick() {
    this.isEdit = false;
    this.showAddEditForm = false;
    this.form.reset();
  }

  openDeleteDialog(rowToDelete: BasicDocumentType): void {
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

  private affectedRowIndex(affectedRow?: BasicDocumentType) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: BasicDocumentType) => row.id === affectedRow.id);
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

  get httpRequest(): Observable<BasicDocumentType> {
    if (this.isEdit) {
      return this.dataHandler.put<BasicDocumentType>(this.module.serviceEndPoint, this.model);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, userId: 0
      }
      const payloads = { ...dummyDefaultFields, ...this.model };
      return this.dataHandler.post<BasicDocumentType>(this.module.serviceEndPoint, payloads);
    }
  }

  loadDocumentGroupDropdown() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<DocumentGroup[]>(`${DocumentGroupMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: DocumentGroup[]) => {
        if (res) {
          this.documentGroupDropdown.templateOptions.options = res.map((e: DocumentGroup) => (
            {
              label: e.documentGroupName,
              value: e.id
            }
          ));
        }
      });
  }

  get documentGroupDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'documentGroupId');
  }


}