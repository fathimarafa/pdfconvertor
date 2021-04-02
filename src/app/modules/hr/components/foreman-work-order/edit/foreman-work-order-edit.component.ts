import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ForemanWorkOrderMetadata } from '../foreman-work-order.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { ForemanWorkOrder } from '../definitions/foreman-work-order.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-foreman-work-order-edit',
  templateUrl: './foreman-work-order-edit.component.html',
  styleUrls: ['./foreman-work-order-edit.component.css']
})
export class ForemanWorkOrderEditComponent implements OnInit {

  // form = new FormGroup({});
  // model: ForemanWorkOrder;
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[];
  isEdit: boolean;

  modalForm = {
    main: {
      form: new FormGroup({}),
      model: {} as ForemanWorkOrder,
      options: {},
      fields: ForemanWorkOrderMetadata.formFields
    },
    child: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: ForemanWorkOrderMetadata.childForm.formFields
    }
  }

  tableColumns;
  dataSource;

  constructor(
    private dialogRef: MatDialogRef<ForemanWorkOrderEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ForemanWorkOrder,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    // this.fields = ForemanWorkOrderMetadata.childForm.formFields;
    this.modalForm.main.model = this.editData;
  }

  ngOnInit(): void {
    this.tableColumns = ForemanWorkOrderMetadata.childForm.tableColumns;
  }

  onSaveBtnClick() {
    if (this.modalForm.main.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.modalForm.main.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<ForemanWorkOrder> {
    if (this.isEdit) {
      const endPoint = `${ForemanWorkOrderMetadata.serviceEndPoint}/${this.modalForm.main.model.foremanWorkorderId}`;
      return this.dataHandler.put<ForemanWorkOrder>(endPoint, this.modalForm.main.model);
    } else {
      return this.dataHandler.post<ForemanWorkOrder>(ForemanWorkOrderMetadata.serviceEndPoint, this.modalForm.main.model);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

}
