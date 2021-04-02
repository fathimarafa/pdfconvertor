import { Inject, Component, OnInit } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NormalProjectBookingMetadata } from './normal-project-booking.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NormalProjectBooking } from './definitions/normal-project-booking.definition';
import { DataHandlerService } from '../../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../../definitions/dialog.definitions';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-normal-project-booking',
  templateUrl: './normal-project-booking.component.html',
  styleUrls: ['./normal-project-booking.component.css']
})
export class NormalProjectBookingComponent implements OnInit {

  form = new FormGroup({});
  model: NormalProjectBooking;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<NormalProjectBookingComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: NormalProjectBooking,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = NormalProjectBookingMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.projectBookingId = this.model.projectBookingId || Math.round(Math.random() * 100).toString();
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<NormalProjectBooking> {
    if (this.isEdit) {
      const endPoint = `${NormalProjectBookingMetadata.serviceEndPoint}/${this.model.projectBookingId}`;
      return this.dataHandler.put<NormalProjectBooking>(endPoint, this.model);
    } else {
      return this.dataHandler.post<NormalProjectBooking>(NormalProjectBookingMetadata.serviceEndPoint, this.model);
    }
  }

}
