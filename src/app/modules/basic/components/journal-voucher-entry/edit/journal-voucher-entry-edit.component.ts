import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { JournalVoucherEntryMetadata } from '../journal-voucher-entry.configuration';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Journal } from '../definitions/journal-voucher-entry.definition';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppStateService } from '../../../../../services/app-state-service/app-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field.handler';

@Component({
  selector: 'app-journal-voucher-entry-edit',
  templateUrl: './journal-voucher-entry-edit.component.html',
  styleUrls: ['./journal-voucher-entry-edit.component.css']
})
export class JournalVoucherEntryEditComponent implements OnInit {

  form = new FormGroup({});
  model: Journal;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  editData: Journal;

  constructor(
    private dataHandler: DataHandlerService,
    private router: Router,
    private stateService: AppStateService,
    private snackBar: MatSnackBar,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
  ) {
    this.editData = this.stateService.getState(JournalVoucherEntryMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
    this.fields = JournalVoucherEntryMetadata.formFields;
    this.model = this.editData || {};
    FormfieldHandler.initialize(this.fields);
    this.bindProjectDivisionFields();
  }

  bindProjectDivisionFields() {
    const projectControllerToFields: ProjectDivisionFields<any> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerToFields);
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
        this.onCancelBtnClick();
      });
    }
  }

  onCancelBtnClick() {
    this.router.navigateByUrl('/home/journal');
  }

  get httpRequest(): Observable<Journal> {
    if (this.isEdit) {
      return this.dataHandler.put<Journal>(JournalVoucherEntryMetadata.serviceEndPoint, this.model);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, financialyearId: 0, userId: 0
      }
      const payloads = { ...dummyDefaultFields, ...this.model };
      return this.dataHandler.post<Journal>(JournalVoucherEntryMetadata.serviceEndPoint, payloads);
    }
  }

  ngOnDestroy() {
    this.form.reset();
    if (this.isEdit) {
      this.stateService.clear(JournalVoucherEntryMetadata.moduleId);
    }
    this.projectDivisionFieldsHandler.clear();
  }

}
