import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { ManualBOQ } from '../definitions/manual-boq.definition';
import { ManualBOQMetadata } from '../manual-boq.configuration';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { TemplateRegistrationMetadata } from '../../template-registration/template-registration.configuration';
import { Template } from '../../template-registration/definitions/template-registration.definition';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';


enum StepperId {
  material = 'material',
  labour = 'labour',
  subcontr = 'subcontr',
  other = 'other'
}

export interface StepType {
  id: string;
  label: string;
  fields: FormlyFieldConfig[];
  hasTable: boolean;
}
@Component({
  selector: 'app-manual-boq-edit',
  templateUrl: './manual-boq-edit.component.html',
  styleUrls: ['./manual-boq-edit.component.css']
})
export class ManualBoqEditComponent implements OnInit {

  activedStep = 0;

  model: ManualBOQ;
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];

  isEdit: boolean;

  modalForm;

  tabTableDef = {};
  tableColumns;

  templateTableColumns;
  templateDataSource;
  selection = new SelectionModel<any>(true, []);

  isTemplateSelectionChanged;

  serviceRepo = {};

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<ManualBoqEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ManualBOQ,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.tableColumns = ManualBOQMetadata.specificationDetailsTable;
  }

  ngOnInit(): void {
    this.defineModalForm();
    this.defineTable();
    FormfieldHandler.initialize(this.steps, this.dataHandler, this.authService.loggedInUser, this.serviceRepo);
    this.bindProjectDivisionFields();
    this.templateTableColumns = ManualBOQMetadata.templateTableColumns;
    this.listenInsertFromTemplatCheckboxChange();
    this.listenNetAmountChange();
  }

  get templateDataColumns() {
    if (this.templateTableColumns && this.templateTableColumns.length) {
      const columns = this.templateTableColumns.map(col => col.field);
      columns.push('select');
      return columns;
    } else {
      return [];
    }
  }

  isAllSelected() {
    const totalSelected = this.selection.selected.length;
    const totalRows = this.templateDataSource.data.length;
    return totalSelected === totalRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.templateDataSource.data.forEach(row => this.selection.select(row));
  }

  listenInsertFromTemplatCheckboxChange() {
    FormfieldHandler.insertFromTemplateCheckbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      if (this.model['insertFromTemplate']) {
        this.loadTemplate();
      }
    }
  }

  defineModalForm() {
    this.model = this.editData || {};
    this.steps = ManualBOQMetadata.formFields;
    this.form = new FormArray(ManualBOQMetadata.formFields.map(() => new FormGroup({})));
    this.options = ManualBOQMetadata.formFields.map(() => <FormlyFormOptions>{});
  }

  defineTable() {
    this.steps.forEach(e => {
      if (e.hasTable) {
        this.tabTableDef[e.id] = {
          dataSource: new MatTableDataSource([]),
          tableColumns: this.getColumns(e.id)
        }
        this.tabTableDef[e.id]['dataColumns'] = this.tabTableDef[e.id].tableColumns.map(e => e.field);
      }
    })
    if (this.isEdit) {
      this.loadBOQItemDetails();
    }
  }

  loadBOQItemDetails() {
    this.dataHandler.get(`${ManualBOQMetadata.serviceEndPoint}/${this.editData.id}`).subscribe((res: any[]) => {
      this.addItemDetailsToTable(res);
    });
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<ManualBOQ> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    if (step === 0) {
      this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
      if (this.model['insertFromTemplate'] && this.selection.selected.length) {
        let selectedItems = this.selection.selected.map(e => {
          return { 'id': e.id };
        });
        this.loadSelectedTemplateDetails(selectedItems);
      }
    }
    this.activedStep = step + 1;
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<ManualBOQ> {
    const payload: ManualBOQ = this.model;
    payload.boqDetails = [];
    for (let x in this.tabTableDef) {
      payload.boqDetails = payload.boqDetails.concat(this.tabTableDef[x].dataSource.data);
    }
    if (this.isEdit) {
      return this.dataHandler.put<ManualBOQ>(ManualBOQMetadata.serviceEndPoint, [payload]);
    } else {
      return this.dataHandler.post<ManualBOQ>(ManualBOQMetadata.serviceEndPoint, [payload]);
    }
  }

  loadTemplate() {
    this.dataHandler.get(this.templateServiceUrl)
      .subscribe((res: Template[]) => {
        if (res) {
          this.templateDataSource = new MatTableDataSource(res);
          this.templateDataSource.paginator = this.paginator;
        }
      });
  }

  loadSelectedTemplateDetails(payload) {
    this.dataHandler.put(`${TemplateRegistrationMetadata.serviceEndPoint}List`, payload).subscribe((res: any[]) => {
      const isFromTemplate = true;
      this.addItemDetailsToTable(res, isFromTemplate);
    });
  }

  addItemDetailsToTable(itemDetails, isFromTemplate?: boolean) {
    itemDetails.forEach(itemType => {
      if (isFromTemplate) {
        itemType.qtyRequired = itemType.itemQty;
        itemType.rateOfItem = itemType.itemRate;
      }
      itemType.amount = itemType.qtyRequired * itemType.rateOfItem;
      this.model['subTotal'] = this.model['subTotal'] + itemType.amount;
      switch (itemType.itemTypeId) {
        case 1:
          this.tabTableDef[StepperId.labour].dataSource.data.push(itemType);
          break;
        case 2:
          this.tabTableDef[StepperId.subcontr].dataSource.data.push(itemType);
          break;
        case 3:
          this.tabTableDef[StepperId.material].dataSource.data.push(itemType);
          break;
      }
    });
    for (let x in this.tabTableDef) { // update table view
      this.tabTableDef[x].dataSource._updateChangeSubscription();
    }
    this.calculateNetAmount();
  }

  onAddRowBtnClick(tab, form) {
    const row = form.value;
    row.amount = row.qtyRequired * row.rateOfItem;
    row.masApproval = row.masApproval ? 1 : 0;
    this.model['subTotal'] = this.model['subTotal'] + row.amount;
    let item;
    switch (tab) {
      case StepperId.material:
        item = this.serviceRepo[StepperId.material].find(e => e.id === row.itemId);
        row.itemName = item.materialName;
        row.itemTypeId = 3;
        break;
      case StepperId.labour:
        item = this.serviceRepo[StepperId.labour].find(e => e.id === row.itemId);
        row.itemName = item.labourWorkName;
        row.itemTypeId = 1;
        break;
      case StepperId.subcontr:
        item = this.serviceRepo[StepperId.subcontr].find(e => e.id === row.itemId);
        row.itemName = item.labourWorkName;
        row.itemTypeId = 2;
        break;
    }
    this.tabTableDef[tab].dataSource.data.push(row);
    this.tabTableDef[tab].dataSource._updateChangeSubscription();
    form.reset();
  }

  private get templateServiceUrl() {
    //Worknameid/CategoryID
    return 'BuildExeCRM/api/TemplateList/1/2';
    return `${TemplateRegistrationMetadata.serviceEndPoint}List/${this.modalForm.project.model.workNameId}/${this.modalForm.project.model.categoryId}`
  }

  getColumns(tab: string) {
    let columns = JSON.parse(JSON.stringify(this.tableColumns));
    switch (tab) {
      case StepperId.material:
        columns[1].displayName = 'Material';
        break;
      case StepperId.labour:
        columns[1].displayName = 'Labour';
        break;
      case StepperId.subcontr:
        columns[1].displayName = 'Sub Contractor';
        break;
    }
    return columns;
  }

  // amount calculaton //
  private listenNetAmountChange() {
    //water and electricity charge
    FormfieldHandler.waterElectricityChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.waterElectricityCharge = this.model['subTotal'] * (this.model.waterElectricityChargePer / 100);
      this.calculateNetAmount();
    }
    FormfieldHandler.waterElectricityChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.waterElectricityChargePer = (this.model.waterElectricityCharge / this.model['subTotal']) * 100;
      this.calculateNetAmount();
    }
    //additional charge
    FormfieldHandler.labourAdditionalChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.labourAdditionalCharge = this.model['subTotal'] * (this.model.labourAdditionalChargeper / 100);
      this.calculateNetAmount();
    }
    FormfieldHandler.labourAdditionalChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.labourAdditionalChargeper = (this.model.labourAdditionalCharge / this.model['subTotal']) * 100;
      this.calculateNetAmount();
    }
    //subcontract charge
    FormfieldHandler.subcontractAdditionalChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.subcontractAdditionalCharge = this.model['subTotal'] * (this.model.subcontractAdditionalChargePer / 100);
      this.calculateNetAmount();
    }
    FormfieldHandler.subcontractAdditionalChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.subcontractAdditionalChargePer = (this.model.subcontractAdditionalCharge / this.model['subTotal']) * 100;
      this.calculateNetAmount();
    }
    //other expense
    FormfieldHandler.otherExpenseAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.calculateNetAmount();
    }
    //profit
    FormfieldHandler.contractorProfitPerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.contractorProfitAmt = this.model['subTotalWithAdditionalCharges'] * (this.model.contractorProfitPer / 100);
      this.calculateNetAmount();
    }
    FormfieldHandler.contractorProfitAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.contractorProfitPer = (this.model.contractorProfitAmt / this.model['subTotalWithAdditionalCharges']) * 100;
      this.calculateNetAmount();
    }
    //taxPer
    FormfieldHandler.taxPerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.taxAmount = this.model['subTotalWithAdditionalCharges'] * (this.model.taxPer / 100);
      this.calculateNetAmount();
    }
    FormfieldHandler.taxAmountInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.taxPer = (this.model.taxAmount / this.model['subTotalWithAdditionalCharges']) * 100;
      this.calculateNetAmount();
    }
  }

  private calculateSubTotalWithAdditionalCharges() {
    this.model['subTotalWithAdditionalCharges'] = this.model['subTotal'] + this.model.waterElectricityCharge + this.model.labourAdditionalCharge + this.model.subcontractAdditionalCharge + this.model.other_expense;
    this.calculateProfitAndTax();
  }

  private calculateProfitAndTax() {
    this.model.contractorProfitAmt = this.model['subTotalWithAdditionalCharges'] * (this.model.contractorProfitPer / 100);
    this.model.contractorProfitPer = (this.model.contractorProfitAmt / this.model['subTotalWithAdditionalCharges']) * 100;
    this.model.taxAmount = this.model['subTotalWithAdditionalCharges'] * (this.model.taxPer / 100);
    this.model.taxPer = (this.model.taxAmount / this.model['subTotalWithAdditionalCharges']) * 100;

  }

  private calculateNetAmount() {
    this.calculateSubTotalWithAdditionalCharges();
    this.model['netAmount'] = this.model['subTotalWithAdditionalCharges'] + this.model.contractorProfitAmt + this.model.taxAmount;
    this.model = { ...this.model };
  }
  // -- -- //

  ngOnDestroy() {
    this.form.reset();
  }

}
