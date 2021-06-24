import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { BasicWorkCategory } from '../definitions/basic-work-category.definition';
import { BasicWorkCategoryMetadata } from '../basic-work-category.configuration';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-work-category-edit',
  templateUrl: './work-category-edit.component.html',
  styleUrls: ['./work-category-edit.component.css']
})
export class WorkCategoryEditComponent implements OnInit {

  form = new FormGroup({});
  model: BasicWorkCategory;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<WorkCategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: BasicWorkCategory,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = BasicWorkCategoryMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
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

  get httpRequest(): Observable<BasicWorkCategory> {
    if (this.isEdit) {
      return this.dataHandler.put<BasicWorkCategory>(BasicWorkCategoryMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<BasicWorkCategory>(BasicWorkCategoryMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
