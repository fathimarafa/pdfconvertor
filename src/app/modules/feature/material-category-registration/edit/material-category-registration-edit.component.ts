import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MaterialCategoryRegistration } from '../definitions/material-category.definition';
import { MaterialCategoryRegistrationMetadata } from '../material-category-registration.configuration';

@Component({
  selector: 'app-material-category-registration-edit',
  templateUrl: './material-category-registration-edit.component.html',
  styleUrls: ['./material-category-registration-edit.component.css']
})
export class MaterialCategoryRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: MaterialCategoryRegistration;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<MaterialCategoryRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialCategoryRegistration,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = MaterialCategoryRegistrationMetadata.formFields;
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

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<MaterialCategoryRegistration> {
    const dummyFields = {
      userId: 1,
      companyId: 1,
      branchId: 1
    };
    if (this.isEdit) {
      return this.dataHandler.put<MaterialCategoryRegistration>(MaterialCategoryRegistrationMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<MaterialCategoryRegistration>(MaterialCategoryRegistrationMetadata.serviceEndPoint, {...this.model,...dummyFields});
    }
  }

  // fetchMaterialCategory() {
  //   const dummyCompanyId = 1; const dummyBranchId = 0;
  //   this.dataHandler.get<MaterialCategoryRegistration[]>(`${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
  //     .subscribe((res: MaterialCategoryRegistration[]) => {
  //       // this.dataSource = new MatTableDataSource(res);
  //       // this.dataSource.paginator = this.paginator;
  //     });
  // }

}