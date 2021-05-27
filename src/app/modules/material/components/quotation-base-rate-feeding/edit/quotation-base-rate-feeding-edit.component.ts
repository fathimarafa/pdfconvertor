import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { QuotationBaseRateFeedingMetadata } from '../quotation-base-rate-feeding.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { QuotationBaseRateFeeding } from '../definitions/quotation-base-rate-feeding.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { FormfieldHandler } from '../handlers/form-field-handler';
import { MaterialQuotationMetadata } from '../../material-quotation/material-quotation.configuration';
import { MaterialQuotation } from '../../material-quotation/definitions/material-quotation.definition';

@Component({
  selector: 'app-quotation-base-rate-feeding-edit',
  templateUrl: './quotation-base-rate-feeding-edit.component.html',
  styleUrls: ['./quotation-base-rate-feeding-edit.component.css']
})
export class QuotationBaseRateFeedingEditComponent implements OnInit {

  form = new FormGroup({});
  model: QuotationBaseRateFeeding;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  quotationList;

  constructor(
    private dialogRef: MatDialogRef<QuotationBaseRateFeedingEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: QuotationBaseRateFeeding,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = QuotationBaseRateFeedingMetadata.formFields;
    this.model = this.editData;
    FormfieldHandler.loadDropdowns(this.fields, this.dataHandler, this.authService.loggedInUser);
    this.listenQuotationChange();
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

  get httpRequest(): Observable<QuotationBaseRateFeeding> {
    if (this.isEdit) {
      return this.dataHandler.put<QuotationBaseRateFeeding>(QuotationBaseRateFeedingMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<QuotationBaseRateFeeding>(QuotationBaseRateFeedingMetadata.serviceEndPoint, this.model);
    }
  }

  listenQuotationChange() {
    this.fetchQuotation();
    FormfieldHandler.quotationDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.onQuotationChange();
    }
  }

  private onQuotationChange() {
    const selectedQuotation: MaterialQuotation = this.quotationList.find(e => e.id === this.model.quotationId);
    if (selectedQuotation) {
      this.model['materialId'] = selectedQuotation.materialId;
      this.model['projectId'] = selectedQuotation.projectId;
      this.model['quotationType'] = selectedQuotation.quotationType;
      this.model['quantity'] = selectedQuotation.quantity;
      this.model['validFrom'] = selectedQuotation.validFrom;
      this.model['validTo'] = selectedQuotation.validTo;
      this.model = { ...this.model };
    }
  }

  private get quotationServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialQuotationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`
  }

  private fetchQuotation() {
    this.dataHandler.get(this.quotationServiceUrl)
      .subscribe((res: MaterialQuotation[]) => {
        if (res) {
          this.quotationList = res;
          FormfieldHandler.quotationDropdown.templateOptions.options = res.map((e: MaterialQuotation) => (
            {
              label: e.quotationNumber,
              value: e.id
            }
          ));
          if (this.isEdit) {
            this.onQuotationChange();
          }
        }
      });
  }

  ngOnDestroy() {
    this.form.reset();
  }

}
