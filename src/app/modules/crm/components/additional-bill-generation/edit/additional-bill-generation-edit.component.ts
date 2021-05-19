import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AdditionalBillGenerationMetadata } from '../additional-bill-generation.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { AdditionBillGeneration } from '../definitions/additional-bill-generation.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../project/definitions/project.definition';
import { ProjectMetadata } from '../../project/project.configuration';

@Component({
  selector: 'app-additional-bill-generation-edit',
  templateUrl: './additional-bill-generation-edit.component.html',
  styleUrls: ['./additional-bill-generation-edit.component.css']
})
export class AdditionalBillGenerationEditComponent implements OnInit {

  form = new FormGroup({});
  model: AdditionBillGeneration;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  detailsForm = new FormGroup({});
  detailsModel;
  detailsOptions: FormlyFormOptions = {};
  detailsFields: FormlyFieldConfig[];

  tableColumns;
  dataSource = new MatTableDataSource([]);

  constructor(
    private dialogRef: MatDialogRef<AdditionalBillGenerationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: AdditionBillGeneration,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = AdditionalBillGenerationMetadata.formFields;
    this.model = this.editData;
    this.detailsFields = AdditionalBillGenerationMetadata.additonalBillDetails.formFields;
    this.detailsModel = {};
    this.tableColumns = AdditionalBillGenerationMetadata.additonalBillDetails.tableColumns
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit(): void {
    this.fetchProjectSelectOptions();
    this.listenTaxAreaChange();
    this.listenBillCostChange();
  }

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

  get httpRequest(): Observable<AdditionBillGeneration> {
    if (this.isEdit) {
      return this.dataHandler.put<AdditionBillGeneration>(AdditionalBillGenerationMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<AdditionBillGeneration>(AdditionalBillGenerationMetadata.serviceEndPoint, this.model);
    }
  }

  onAddBillDetails() {
    const data = Object.assign({}, this.detailsModel);
    this.dataSource.data.push(data);
    this.dataSource._updateChangeSubscription();
  }

  ngOnDestroy() {
    this.form.reset();
  }

  private get projectDropdown() {
    return this.fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.key === 'projectId')
  }

  private fetchProjectSelectOptions() {
    this.dataHandler.get<Project[]>(ProjectMetadata.serviceEndPoint).subscribe((res: Project[]) => {
      if (res) {
        this.projectDropdown.templateOptions.options = res.map((e: Project) => (
          {
            label: e.projectId,
            value: e.projectId
          }
        ));
        // if (this.isEdit) {
        //   this.onProjectChange(this.model.projectId);
        // }
        // this.projectDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
        //   this.onProjectChange(event.value);
        // }
      }
    });
  }

  /*tax area change*/
  private get taxTypeDropdown() {
    return this.detailsFields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.key === 'taxInclusive')
  }

  private get taxAreaDropdown() {
    return this.detailsFields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.key === 'taxArea')
  }

  private listenTaxAreaChange() {
    this.taxAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      if (this.detailsModel.taxArea === 'INTRA') {
        this.sgstPerInputbox.className = 'flex-1';
        this.igstPerInputbox.className = 'flex-1 readonly';
        this.cgstPerInputbox.className = 'flex-1 readonly';
        this.sgstPerInputbox.templateOptions.readonly = false;
        this.igstPerInputbox.templateOptions.readonly = true;
        this.cgstPerInputbox.templateOptions.readonly = true;
        this.detailsModel.igstPercent = 0;
        this.detailsModel.igstAmt = 0;
        this.detailsModel.cgstPercent = 0;
        this.detailsModel.cgstAmount = 0;
      }
      if (this.detailsModel.taxArea === 'INTER') {
        this.sgstPerInputbox.className = 'flex-1 readonly';
        this.igstPerInputbox.className = 'flex-1';
        this.cgstPerInputbox.className = 'flex-1 readonly';
        this.sgstPerInputbox.templateOptions.readonly = true;
        this.igstPerInputbox.templateOptions.readonly = false;
        this.cgstPerInputbox.templateOptions.readonly = true;
        this.detailsModel.sgstPercent = 0;
        this.detailsModel.sgstAmt = 0;
        this.detailsModel.cgstPercent = 0;
        this.detailsModel.cGSTAmt = 0;
      }
      this.detailsModel = { ...this.detailsModel }
    }
  }

  private get rateInputbox() {
    return this.detailsFields.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'rate')
  }

  private get quantityInputbox() {
    return this.detailsFields.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'quantity')
  }

  private get sgstPerInputbox() {
    return this.detailsFields.find(e => e.id === 'row-3')
      .fieldGroup.find(e => e.key === 'sgstPercent')
  }

  private get cgstPerInputbox() {
    return this.detailsFields.find(e => e.id === 'row-3')
      .fieldGroup.find(e => e.key === 'cgstPercent')
  }

  private get igstPerInputbox() {
    return this.detailsFields.find(e => e.id === 'row-3')
      .fieldGroup.find(e => e.key === 'igstPercent')
  }

  private get kfcPerInputbox() {
    return this.detailsFields.find(e => e.id === 'row-4')
      .fieldGroup.find(e => e.key === 'kfcper')
  }

  private get tdsPerInputbox() {
    return this.detailsFields.find(e => e.id === 'row-4')
      .fieldGroup.find(e => e.key === 'tdsPercent')
  }

  private get lwPerInputbox() {
    return this.detailsFields.find(e => e.id === 'row-4')
      .fieldGroup.find(e => e.key === 'labourWelfarePercent')
  }

  private listenBillCostChange() {
    this.rateInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.detailsModel['amount'] = this.detailsModel.rate * this.detailsModel.quantity
      this.detailsModel = { ...this.detailsModel };
    }
    this.quantityInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.detailsModel['amount'] = this.detailsModel.rate * this.detailsModel.quantity
      this.detailsModel = { ...this.detailsModel };
    }
    this.sgstPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.detailsModel.sgstAmt = this.detailsModel['amount'] * (this.detailsModel.sgstPercent / 100);
      this.detailsModel = { ...this.detailsModel };
    }
    this.cgstPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.detailsModel.cGSTAmt = this.detailsModel['amount'] * (this.detailsModel.cgstPercent / 100);
      this.detailsModel = { ...this.detailsModel };
    }
    this.igstPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.detailsModel.igstAmt = this.detailsModel['amount'] * (this.detailsModel.igstPercent / 100);
      this.detailsModel = { ...this.detailsModel };
    }
    this.kfcPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.detailsModel.kfcAmt = this.detailsModel['amount'] * (this.detailsModel.kfcper / 100);
      this.detailsModel = { ...this.detailsModel };
    }
    this.tdsPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.detailsModel.tdsAmount = this.detailsModel['amount'] * (this.detailsModel.tdsPercent / 100);
      this.detailsModel = { ...this.detailsModel };
    }
    this.lwPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.detailsModel.labourWelfareAmount = this.detailsModel['amount'] * (this.detailsModel.labourWelfarePercent / 100);
      this.detailsModel = { ...this.detailsModel };
    }
  }

}
