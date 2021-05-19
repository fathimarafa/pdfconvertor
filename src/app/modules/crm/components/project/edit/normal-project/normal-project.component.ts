import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NormalProjectMetadata } from './normal-project.configuration';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ProjectRegistration, ProjectStage } from '../../definitions/project.definition';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { MatTableDataSource } from '@angular/material/table';

export interface StepType {
  id: string;
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-normal-project',
  templateUrl: './normal-project.component.html',
  styleUrls: ['./normal-project.component.css']
})
export class NormalProjectComponent implements OnInit {

  activedStep = 0;
  model: ProjectRegistration;
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];
  isEdit: boolean;
  paymentDataset;

  stageDatasource;
  stageTableColumns;

  consultancyDatasource;
  consultancyTableColumns;

  constructor(
    private dialogRef: MatDialogRef<NormalProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ProjectRegistration,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.model = this.editData;
  }


  get stageDatacolumns() {
    if (this.stageTableColumns && this.stageTableColumns.length) {
      return this.stageTableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  get consultancyDatacolumns() {
    if (this.consultancyTableColumns && this.consultancyTableColumns.length) {
      return this.consultancyTableColumns.map(col => col.field);
    } else {
      return [];
    }
  }



  ngOnInit(): void {
    this.steps = NormalProjectMetadata.formFields;
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});
    this.listenProjectTypeChange();

    // this.steps.push(NormalProjectMetadata.projectStageForm.fields);

    this.consultancyTableColumns = NormalProjectMetadata.projectConsultancyForm.tableColumns;
    this.consultancyDatasource = new MatTableDataSource([]);

    this.stageTableColumns = NormalProjectMetadata.projectStageForm.tableColumns;
    this.stageDatasource = new MatTableDataSource([]);


  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  onSubmitBtnClick(stepper) {
    stepper.reset();
  }

  private get projectTypeDropdown() {
    return this.steps.find(e => e.id === 'projectdetails')
      .fields.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'projectTypeId')
  }

  listenProjectTypeChange() {
    this.projectTypeDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.steps.splice(2);
      if (this.model['projectTypeId'] === 'CP') {
        this.steps.push(NormalProjectMetadata.privateProjectForm);
        this.listenPrivateProjectCostChange();
      }
      if (this.model['projectTypeId'] === 'CN') {
        this.steps.push(NormalProjectMetadata.projectConsultancyForm.fields);
      }
      this.loadPayment();
    }
  }

  private get paymentDropdown() {
    return this.steps.find(e => e.id === 'privateprojectdetails')
      .fields.find(e => e.key === 'paymentModeId')
  }

  private listenPrivatePaymentModeChange() {
    this.paymentDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.showHideStageForm();
    };
  }

  showHideStageForm() {
    const selectedPayment = this.paymentDataset.find(e => e.id === this.model.paymentModeId);
    if (selectedPayment) {
      this.steps.splice(3);
      if (selectedPayment.paymentMode.toLowerCase().includes('stage')) {
        this.steps.push(NormalProjectMetadata.projectStageForm.fields);
        const loadStageDropdown = true;
        this.bindPaymentSelectOptions(loadStageDropdown);
        this.listenStageFormEvents();
      }
    }
  }

  bindPaymentSelectOptions(isStage?: boolean) {
    if (this.paymentDataset && this.paymentDataset.length) {
      const dropdown = isStage ? this.stagePaymentDropdown : this.paymentDropdown;
      dropdown.templateOptions.options = this.paymentDataset.map((e) => (
        {
          label: e.paymentMode,
          value: e.id
        }
      ))
    }
  }

  private loadPayment() {
    this.dataHandler.get(`${NormalProjectMetadata.serviceEndPoint}PaymentMode`).subscribe((res: any[]) => {
      this.paymentDataset = res;
      this.bindPaymentSelectOptions();
      if (this.model['projectTypeId'] === 'CP') {
        this.listenPrivatePaymentModeChange();
      }
    });
  }

  onAddConsultancyWorkBtnClick() {
    this.consultancyDatasource.data.push([]);
    this.consultancyDatasource._updateChangeSubscription();
  }

  onAddStageBtnClick(form) {
    //   const data = {
    //     projectId:  this.model.projectId
    //     ownProjectDetailsiId: this.model.ownProjectDetailsiId
    //     stageName:this.model.stageName
    //     stageStatusId:this.model.stageStatusId
    //     stageRemarks:this.model.stageRemarks
    //     dateToStart:this.model.dateToStart
    //     dateToComplete:this.model.dateToComplete
    //     dateCompleted:this.model.dateCompleted
    //     dateDue:this.model.dateDue
    //     paymentPercentage:this.model.paymentPercentage
    //     stageTypethis.model.stageType
    //     this.model.sacCode
    //     this.model.taxInclusive
    //     this.model.taxArea
    //     this.model.paymentModeId
    //     this.model.sgstPercent
    //     this.model.sgstAmt
    //     this.model.cgstPercent
    //     this.model.cGSTAmt
    //     this.model.igstPercent
    //     this.model.igstAmt
    //     this.model.labourWelfarePercent
    //     this.model.labourWelfareAmount
    //     this.model.tdsPercent
    //     this.model.tdsAmount
    //     this.model.kfcper
    //     this.model.kfcAmt
    //     this.model.discount
    //     this.model.netAmount
    //     this.model.amountBalance
    //     this.model.voucherTypeId
    //     this.model.voucherNumber
    //     this.model.userId
    // }
    // if (this.form.valid) {
    let data: any = Object.assign({}, this.model);
    data['dateToStart'] = data.dateToStart.toLocaleString();
    data['dateCompleted'] = data.dateCompleted.toLocaleString();
    this.stageDatasource.data.push(data);
    this.stageDatasource._updateChangeSubscription();
    this.lockStageInputFields();
    // }

  }

  // pendingStage 
  // bindPendingStageCost() {
  //   if(!this.pe)
  //   this.pendingStage.amt = 
  //   this.pendingStage.per = 
  // }

  lockStageInputFields() {
    this.taxTypeDropdown.className = 'flex-1 field-size-small readonly';
    this.taxTypeDropdown.templateOptions.disabled = true;
    this.taxAreaDropdown.className = 'flex-1 field-size-small readonly';
    this.taxAreaDropdown.templateOptions.disabled = true;
    this.stageInputMethodInputbox.templateOptions.disabled = true;
    this.stageInputMethodInputbox.className = 'flex-1 checkbox-outline-none';
  }

  onConsultanyPaymentModeSelection(data) {
    this.model.paymentModeId = data;
    this.showHideStageForm();
  }

  ngAfterViewInit() {
    const cdkDom = document.getElementsByClassName('cdk-overlay-pane');
    if (cdkDom && cdkDom.length) {
      let domStyle = cdkDom[0]['style'];
      domStyle.maxWidth = '90vw';
      domStyle.minHeight = '90vh';
      domStyle.minWidth = '90vw'
    }
  }

  ngOnDestroy() {

  }

  /* private project fields */
  private get totalAreaDropdown() {
    return this.steps.find(e => e.id === 'privateprojectdetails')
      .fields.find(e => e.key === 'totalArea')
  }
  private get ratePerAreaDropdown() {
    return this.steps.find(e => e.id === 'privateprojectdetails')
      .fields.find(e => e.key === 'ratePerArea')
  }
  private listenPrivateProjectCostChange() {
    this.totalAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.calculatePrivateProjectTotalAmount();
    }
    this.ratePerAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.calculatePrivateProjectTotalAmount();
    }
  }
  private calculatePrivateProjectTotalAmount() {
    this.model.totalAmount = this.model.totalArea * this.model.ratePerArea;
    this.model = { ...this.model };
  }
  /**/

  /* stage fields */

  private listenStageFormEvents() {
    this.model.paymentPercentage = 100;
    this.model['stageAmount'] = this.model.totalAmount;
    this.model = { ...this.model };
    this.listenTaxAreaChange();
    this.listenStageInputMethodChange();
    this.listenStageCostChange();
  }

  private get stagePaymentDropdown() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.key === 'paymentModeId')
  }

  private get taxTypeDropdown() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'taxfields')
      .fieldGroup.find(e => e.key === 'taxInclusive')
  }

  private get taxAreaDropdown() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'taxfields')
      .fieldGroup.find(e => e.key === 'taxArea')
  }

  private listenTaxAreaChange() {
    this.taxAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      if (this.model.taxArea === 'INTRA') {
        this.sgstPerInputbox.className = 'flex-1';
        this.igstPerInputbox.className = 'flex-1 readonly';
        this.cgstPerInputbox.className = 'flex-1 readonly';
        this.sgstPerInputbox.templateOptions.readonly = false;
        this.igstPerInputbox.templateOptions.readonly = true;
        this.cgstPerInputbox.templateOptions.readonly = true;
        this.model.igstPercent = 0;
        this.model.cgstPercent = 0;
      }
      if (this.model.taxArea === 'INTER') {
        this.sgstPerInputbox.className = 'flex-1 readonly';
        this.igstPerInputbox.className = 'flex-1';
        this.cgstPerInputbox.className = 'flex-1 readonly';
        this.sgstPerInputbox.templateOptions.readonly = true;
        this.igstPerInputbox.templateOptions.readonly = false;
        this.cgstPerInputbox.templateOptions.readonly = true;
        this.model.sgstPercent = 0;
        this.model.cgstPercent = 0;
      }
      this.model = { ...this.model }
    }
  }

  private get stageInputMethodInputbox() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'percentageWise')
  }

  private listenStageInputMethodChange() {
    this.stageInputMethodInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      if (this.model['percentageWise']) {
        this.stagePerInputbox.templateOptions.readonly = false;
        this.stageAmtInputbox.templateOptions.readonly = true;
        this.stagePerInputbox.className = 'flex-1';
        this.stageAmtInputbox.className = 'flex-1 readonly';
      } else {
        this.stagePerInputbox.templateOptions.readonly = true;
        this.stageAmtInputbox.templateOptions.readonly = false;
        this.stagePerInputbox.className = 'flex-1 readonly';
        this.stageAmtInputbox.className = 'flex-1';
      }
    }
  }

  private get stagePerInputbox() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'paymentPercentage')
  }

  private get stageAmtInputbox() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'stageAmount')
  }

  private get sgstPerInputbox() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-3')
      .fieldGroup.find(e => e.key === 'sgstPercent')
  }

  private get cgstPerInputbox() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-3')
      .fieldGroup.find(e => e.key === 'cgstPercent')
  }

  private get igstPerInputbox() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-3')
      .fieldGroup.find(e => e.key === 'igstPercent')
  }

  private get kfcPerInputbox() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-4')
      .fieldGroup.find(e => e.key === 'kfcper')
  }

  private get tdsPerInputbox() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-4')
      .fieldGroup.find(e => e.key === 'tdsPercent')
  }

  private get lwPerInputbox() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-4')
      .fieldGroup.find(e => e.key === 'labourWelfarePercent')
  }

  private get discountPerInputbox() {
    return this.steps.find(e => e.id === 'stagework')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-5')
      .fieldGroup.find(e => e.key === 'discount')
  }

  private listenStageCostChange() {
    this.stagePerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model['stageAmount'] = this.model.totalAmount * (this.model.paymentPercentage / 100);
      this.model = { ...this.model };
    }
    this.stageAmtInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.paymentPercentage = (this.model['stageAmount'] / this.model.totalAmount) * 100;
      this.model = { ...this.model };
    }
    this.sgstPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.sgstAmt = this.model['stageAmount'] * (this.model.sgstPercent / 100);
      this.model = { ...this.model };
    }
    this.cgstPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.cGSTAmt = this.model['stageAmount'] * (this.model.cgstPercent / 100);
      this.model = { ...this.model };
    }
    this.igstPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.igstAmt = this.model['stageAmount'] * (this.model.igstPercent / 100);
      this.model = { ...this.model };
    }
    this.kfcPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.kfcAmt = this.model['stageAmount'] * (this.model.kfcper / 100);
      this.model = { ...this.model };
    }
    this.tdsPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.tdsAmount = this.model['stageAmount'] * (this.model.tdsPercent / 100);
      this.model = { ...this.model };
    }
    this.lwPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.labourWelfareAmount = this.model['stageAmount'] * (this.model.labourWelfarePercent / 100);
      this.model = { ...this.model };
    }
  }

  /*  */

}
