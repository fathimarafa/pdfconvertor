import { Component, OnInit, ViewChild } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { SpecificationDetail, SpecificationDetailsTabId } from '../specification-registration/definitions/specification-registration.definition';
import { RateEvalutationMetadata } from './rate-evaluation.configuration';
import { FormGroup } from '@angular/forms';
import { ProjectMetadata } from 'src/app/modules/crm/components/project/project.configuration';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';
import { RateEvaluation, RateEvaluationDetails } from './definitions/rate-evaluation.definition';
import { FormfieldHandler } from './handlers/form-field.handler';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-rate-evaluation',
  templateUrl: './rate-evaluation.component.html',
  styleUrls: ['./rate-evaluation.component.css']
})
export class RateEvaluationComponent implements OnInit {

  module;
  modalForm;

  form = new FormGroup({});
  model: RateEvaluation;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  activedStep = 0;
  steps: any[];

  specificationDetailsList: SpecificationDetail[];

  tabTableDef = {};
  tableColumns;
  tabsWithTable = ['material', 'labour', 'subcontr'];

  projectList: Project[] = [];

  subscribeProjectChange: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private router: Router,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private snackBar: MatSnackBar
  ) {
    this.module = RateEvalutationMetadata;
    this.defineForms();
    this.defineTables();
    this.fetchProject();
  }

  ngOnInit() {
    this.listenProjectChange();
    this.listenNetAmountChange();
  }

  defineForms() {
    this.steps = this.module.tabs;
    this.modalForm = {
      project: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: this.module.formfields
      },
      projectEvaluation: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: this.module.evaluationFormfields
      }
    }
    FormfieldHandler.initialize(this.modalForm.project.fields, this.modalForm.projectEvaluation.fields);
    this.bindProjectDivisionFields();
  }

  bindProjectDivisionFields() {
    const projectControllerToFields: ProjectDivisionFields<RateEvaluation> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForm.project.model,
      broadcastChanges:true,
      isEdit: false
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerToFields);
  }

  defineTables() {
    this.tableColumns = this.module.tableColumns;
    this.tabsWithTable.forEach((tab: string) => {
      this.tabTableDef[tab] = {
        dataSource: new MatTableDataSource([]),
        tableColumns: this.getColumns(tab)
      }
      this.tabTableDef[tab]['dataColumns'] = this.tabTableDef[tab].tableColumns.map(e => e.field);
    });
  }

  fetchProject() {
    this.dataHandler.get<Project[]>(ProjectMetadata.serviceEndPoint).subscribe((res: Project[]) => {
      this.projectList = res;
    })
  }

  fetchRateEvaluation() {
    this.dataHandler.get<RateEvaluation[]>(this.rateServiceUrl).subscribe((res: RateEvaluation[]) => {
      if (res && res.length) {
        res.forEach((rateEvaluation: RateEvaluation) => {
          this.bindRateEvaluation(rateEvaluation);
          rateEvaluation.rateEvaluationDetails.forEach((detail: RateEvaluationDetails) => {
            switch (detail.specItemTypeId) {
              case 1:
                this.tabTableDef[SpecificationDetailsTabId.labour].dataSource.data.push(detail);
                break;
              case 2:
                this.tabTableDef[SpecificationDetailsTabId.subcontr].dataSource.data.push(detail);
                break;
              case 3:
                this.tabTableDef[SpecificationDetailsTabId.material].dataSource.data.push(detail);
                break;
            }
          });
        })
        this.tabsWithTable.forEach((tab: string) => {
          this.tabTableDef[tab].dataSource._updateChangeSubscription();
        });
      } else {
        this.snackBar.open('No data found');
      }

    })
  }

  bindRateEvaluation(rateEvaluation: RateEvaluation) {
    ['id', 'companyId', 'branchId'].forEach(e => {
      this.modalForm.project.model[e] = rateEvaluation[e];
    });
    for (const field of Object.keys(this.modalForm.projectEvaluation.form.value)) {
      this.modalForm.projectEvaluation.model[field] = rateEvaluation[field];
    }
    ['waterElectricity', 'labourAdditional', 'subcontractAdditional'].forEach(e => {
      this.modalForm.projectEvaluation.model[e + 'ChargeAmt'] = this.modalForm.projectEvaluation.model.subTotal * (this.modalForm.projectEvaluation.model[e + 'Charge'] / 100);
    });
    this.modalForm.projectEvaluation.model = { ...this.modalForm.projectEvaluation.model };
  }

  get rateServiceUrl() {
    // return 'BuildExeCRM/api/RateEvaluation/1009/19/4/2'
    // projected/unitid/blockid/Floorid
    const selected = this.modalForm.project.model;
    return `${this.module.serviceEndPoint}/${selected.projectId}/${selected.unitId}/${selected.blockId}/${selected.floorId}`;
  }

  getColumns(tab: string) {
    let columns = JSON.parse(JSON.stringify(this.tableColumns));
    switch (tab) {
      case SpecificationDetailsTabId.material:
        columns[1].displayName = 'Material';
        break;
      case SpecificationDetailsTabId.labour:
        columns[1].displayName = 'Labour';
        break;
      case SpecificationDetailsTabId.subcontr:
        columns[1].displayName = 'Sub Contractor';
        break;
    }
    return columns;
  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
        this.clearTable();
      })
    }
  }

  get httpRequest(): Observable<RateEvaluation> {
    let payload: RateEvaluation = { ...this.modalForm.project.model, ...this.modalForm.projectEvaluation.model };
    payload.rateEvaluationDetails = [];
    for (const x in this.tabTableDef) {
      payload.rateEvaluationDetails = payload.rateEvaluationDetails.concat(this.tabTableDef[x].dataSource.data);
    }
    return this.dataHandler.put<RateEvaluation>(this.module.serviceEndPoint, [payload]);
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  listenProjectChange() {
    this.subscribeProjectChange = this.projectDivisionFieldsHandler.listenChange().subscribe(res => {
      this.clearTable();
    })
  }

  clearTable() {
    for (const x in this.tabTableDef) {
      this.tabTableDef[x].dataSource.data = [];
      this.tabTableDef[x].dataSource._updateChangeSubscription();
    }
    this.modalForm.projectEvaluation.model = {};
  }

  onShowEvaluationBtnClick() {
    if (this.modalForm.project.form.valid) {
      this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
      this.fetchRateEvaluation();
    }
  }

  private listenNetAmountChange() {
    //water and electricity charge
    FormfieldHandler.waterElectricityChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForm.projectEvaluation.model.waterElectricityChargeAmt = this.modalForm.projectEvaluation.model.subTotal * (this.modalForm.projectEvaluation.model.waterElectricityCharge / 100);
      this.calculateNetAmount();
    }
    FormfieldHandler.waterElectricityChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForm.projectEvaluation.model.waterElectricityCharge = (this.modalForm.projectEvaluation.model.waterElectricityChargeAmt / this.modalForm.projectEvaluation.model.subTotal) * 100;
      this.calculateNetAmount();
    }
    //additional charge
    FormfieldHandler.labourAdditionalChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForm.projectEvaluation.model.labourAdditionalChargeAmt = this.modalForm.projectEvaluation.model.subTotal * (this.modalForm.projectEvaluation.model.labourAdditionalCharge / 100);
      this.calculateNetAmount();
    }
    FormfieldHandler.labourAdditionalChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForm.projectEvaluation.model.labourAdditionalCharge = (this.modalForm.projectEvaluation.model.labourAdditionalChargeAmt / this.modalForm.projectEvaluation.model.subTotal) * 100;
      this.calculateNetAmount();
    }
    //subcontract charge
    FormfieldHandler.subcontractAdditionalChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForm.projectEvaluation.model.subcontractAdditionalChargeAmt = this.modalForm.projectEvaluation.model.subTotal * (this.modalForm.projectEvaluation.model.subcontractAdditionalCharge / 100);
      this.calculateNetAmount();
    }
    FormfieldHandler.subcontractAdditionalChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForm.projectEvaluation.model.subcontractAdditionalCharge = (this.modalForm.projectEvaluation.model.subcontractAdditionalChargeAmt / this.modalForm.projectEvaluation.model.subTotal) * 100;
      this.calculateNetAmount();
    }
    //other expense
    FormfieldHandler.otherExpenseAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.calculateNetAmount();
    }
    //profit
    FormfieldHandler.contractorProfitPerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForm.projectEvaluation.model.contractorProfitAmt = this.modalForm.projectEvaluation.model.subTotalWithAdditionalCharges * (this.modalForm.projectEvaluation.model.contractorProfit / 100);
      this.calculateNetAmount();
    }
    FormfieldHandler.contractorProfitAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForm.projectEvaluation.model.contractorProfit = (this.modalForm.projectEvaluation.model.contractorProfitAmt / this.modalForm.projectEvaluation.model.subTotalWithAdditionalCharges) * 100;
      this.calculateNetAmount();
    }
    //tax
    FormfieldHandler.taxPerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForm.projectEvaluation.model.taxAmount = this.modalForm.projectEvaluation.model.subTotalWithAdditionalCharges * (this.modalForm.projectEvaluation.model.tax / 100);
      this.calculateNetAmount();
    }
    FormfieldHandler.taxAmountInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForm.projectEvaluation.model.tax = (this.modalForm.projectEvaluation.model.taxAmount / this.modalForm.projectEvaluation.model.subTotalWithAdditionalCharges) * 100;
      this.calculateNetAmount();
    }
  }

  private calculateSubTotalWithAdditionalCharges() {
    this.modalForm.projectEvaluation.model.subTotalWithAdditionalCharges = this.modalForm.projectEvaluation.model.subTotal + this.modalForm.projectEvaluation.model.waterElectricityChargeAmt + this.modalForm.projectEvaluation.model.labourAdditionalChargeAmt + this.modalForm.projectEvaluation.model.subcontractAdditionalChargeAmt + this.modalForm.projectEvaluation.model.other_expense;
    this.calculateProfitAndTax();
  }

  private calculateProfitAndTax() {
    this.modalForm.projectEvaluation.model.contractorProfitAmt = this.modalForm.projectEvaluation.model.subTotalWithAdditionalCharges * (this.modalForm.projectEvaluation.model.contractorProfit / 100);
    this.modalForm.projectEvaluation.model.contractorProfit = (this.modalForm.projectEvaluation.model.contractorProfitAmt / this.modalForm.projectEvaluation.model.subTotalWithAdditionalCharges) * 100;
    this.modalForm.projectEvaluation.model.taxAmount = this.modalForm.projectEvaluation.model.subTotalWithAdditionalCharges * (this.modalForm.projectEvaluation.model.tax / 100);
    this.modalForm.projectEvaluation.model.tax = (this.modalForm.projectEvaluation.model.taxAmount / this.modalForm.projectEvaluation.model.subTotalWithAdditionalCharges) * 100;

  }

  private calculateNetAmount() {
    this.calculateSubTotalWithAdditionalCharges();
    this.modalForm.projectEvaluation.model.netamount = this.modalForm.projectEvaluation.model.subTotalWithAdditionalCharges + this.modalForm.projectEvaluation.model.contractorProfitAmt + this.modalForm.projectEvaluation.model.taxAmount;
    this.modalForm.projectEvaluation.model = { ...this.modalForm.projectEvaluation.model };
  }

  ngOnDestroy() {
    this.form.reset();
    this.projectDivisionFieldsHandler.clear();
    this.subscribeProjectChange.unsubscribe();
  }

}
