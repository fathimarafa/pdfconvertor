import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FollowUpMetadata } from '../follow-up.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { FollowUp } from '../definitions/follow-up.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { ProjectEnquiry } from '../../project-enquiry/definitions/project-enquiry.definition';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectEnquiryMetadata } from '../../project-enquiry/project-enquiry.configuration';
import { MatPaginator } from '@angular/material/paginator';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-follow-up-edit',
  templateUrl: './follow-up-edit.component.html',
  styleUrls: ['./follow-up-edit.component.css']
})
export class FollowUpEditComponent implements OnInit {

  form = new FormGroup({});
  model: FollowUp;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  tableColumns;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<FollowUpEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: FollowUp,
    private dataHandler: DataHandlerService,
    private snackBar: MatSnackBar
  ) {
    if (this.editData.followupId) {
      this.isEdit = true;
    }
    this.fields = FollowUpMetadata.formFields;
    this.model = this.editData;
    this.defineEnquiryTableColumns();
    this.fetchEnquiry();
    FormfieldHandler.loadDropdown(this.fields, this.dataHandler);
  }

  defineEnquiryTableColumns() {
    this.tableColumns = JSON.parse(JSON.stringify(ProjectEnquiryMetadata.tableColumns));;
    const index = this.tableColumns.findIndex(e => e.field === 'action');
    this.tableColumns.splice(index, 1);
    this.tableColumns[0].displayName = '';
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  onRadioBtnSelection(row) {
    console.log(row);
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  fetchEnquiry() {
    this.dataHandler.get<ProjectEnquiry[]>(ProjectEnquiryMetadata.serviceEndPoint)
      .subscribe((res: ProjectEnquiry[]) => {
        if (this.isEdit) {
          const rowToUpdate = res.find(e => e.enquiryId === this.model.enquiryId);
          if (rowToUpdate) {
            rowToUpdate['isSelected'] = true;
          }
        }
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (!this.model.enquiryId) {
      const message = 'WARNING : Please select enquiry';
      this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
      return;
    }
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  get httpRequest(): Observable<FollowUp> {
    if (this.isEdit) {
      return this.dataHandler.put<FollowUp>(FollowUpMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<FollowUp>(FollowUpMetadata.serviceEndPoint, this.model);
    }
  }

  onRowSelection(selected: ProjectEnquiry) {
    this.model.enquiryId = selected.enquiryId;
    this.dataSource.data.forEach((row) => {
      row.enquiryId === selected.enquiryId ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.form.reset();
  }

}
