import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { PartBillMetadata } from '../part-bill.configuration';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { PartBill } from '../definitions/part-bill.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectSpecificationComponent } from '../edit/select-specification/select-specification.component';
import { elementAt } from 'rxjs/operators';

export interface StepType {
  id: string;
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-part-bill-edit',
  templateUrl: './part-bill-edit.component.html',
  styleUrls: ['./part-bill-edit.component.css']
})
export class PartBillEditComponent implements OnInit {

  modalForm;
  isEdit: boolean;
  tableColumns;
  dataSource;
  dataColumns;

  activedStep = 0;
  model: PartBill = {};
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];
  // isEdit: boolean;

  gridEditableFields = ['currentQty', 'currentTax', 'description'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<PartBillEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: PartBill,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
  }

  ngOnInit(): void {
    // this.defineForms();
    this.tableColumns = PartBillMetadata.detailsTableColumn;
    this.dataColumns = this.getDataColumns();
    this.dataSource = new MatTableDataSource([]);

    this.steps = PartBillMetadata.formFields;
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});

    FormfieldHandler.initialize(this.steps);
    this.bindProjectDivisionFields();

    if (!this.isEdit) {
      // this.bindDefaultValue();
    }
  }

  bindDefaultValue() {
    this.model.taxarea = 'INTRA';
    this.model['withLogo'] = true;
    ['billDate', 'fromDate', 'toDate', 'dueDate'].forEach(e => {
      this.model[e] = new Date();
    })
    this.model = { ...this.model };
  }

  private bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<PartBill> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }

  table;
  defineTable() {
    this.table = {
      columns: PartBillMetadata.tableColumns,
      dataColumns: PartBillMetadata.tableColumns.map(e => e.field),
      dataSource: new MatTableDataSource([])
    }
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

  get httpRequest(): Observable<PartBill> {
    const payload: PartBill = { ...this.model, ...this.modalForm.billAmountDetails.model };
    payload.partBillDetails = this.dataSource.data;
    if (this.isEdit) {
      return this.dataHandler.put<PartBill>(PartBillMetadata.serviceEndPoint, payload);
    } else {
      return this.dataHandler.post<PartBill>(PartBillMetadata.serviceEndPoint, payload);
    }
  }

  private getDataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  onPrepareBtnClick() {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    this.dataHandler.get(this.partbillDetailsServiceUrl).subscribe((res: any[]) => {
      if (res && res.length) {
        res.forEach(e => {
          e.currentTax = e.tax;
          e.previousQty = e.previousQty + e.currentQty;
          e.currentQty = 0;
          e.totalQty = e.previousQty;
          e.previousAmount = e.previousQty * e.partRatePerUnit;
          e.currentAmount = 0;
          e.totalAmount = e.previousAmount;
          this.model['grossAmount'] = this.model['grossAmount'] + e.totalAmount;
        });
        this.dataSource = new MatTableDataSource(res);
      }
    })
  }

  private calculateGrossAmount(row) {
    this.model['grossAmount'] = this.model['grossAmount'] + row.totalAmount;
  }

  private get partbillDetailsServiceUrl() {
    //:projectId/:UnitId/:Blockid/:Floord
    return `${PartBillMetadata.serviceEndPoint}/${this.model.projectId}/${this.model.unitId}/${this.model.blockId}/${this.model.floorId}`
  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
    if (step === 0) {
      this.onPrepareBtnClick();
    }
  }

  onSelectSpecBtnClick() {
    const dialogReference = this.dialog.open(SelectSpecificationComponent, { width: '80vw', data: this.model });
    dialogReference.afterClosed().subscribe((result: any[]) => {
      if (result) {
        result.forEach(e => {
          e.partRatePerUnit = e.ratePerUnit;
          // e.scheduledQty = e.quantityRequired || 0;
          ['previousQty', 'previousAmount', 'currentQty', 'currentAmount', 'totalQty', 'totalAmount'].forEach(key => {
            e[key] = 0;
          })
        })
        this.dataSource.data = this.dataSource.data.concat(result);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  onUserInput(event, row, column) {
    if (column === 'currentQty') {
      row.currentAmount = row.partRatePerUnit * row.currentQty;
      this.model['grossAmount'] = this.model['grossAmount'] + row.currentAmount;
    }
  }

  private get taxTypeDropdown() {
    return this.steps.find(e => e.id === 'bill-amount-details')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.key === 'taxInclusive')
  }

  private get taxAreaDropdown() {
    return this.steps.find(e => e.id === 'bill-details')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.key === 'taxArea')
  }

  private listenTaxAreaChange() {
    this.taxAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      if (this.model.taxarea === 'INTRA') {
        this.sgstPerInputbox.className = 'flex-1';
        this.igstPerInputbox.className = 'flex-1 readonly';
        this.cgstPerInputbox.className = 'flex-1 readonly';
        this.sgstPerInputbox.templateOptions.readonly = false;
        this.igstPerInputbox.templateOptions.readonly = true;
        this.cgstPerInputbox.templateOptions.readonly = true;
        this.model.igstPercent = 0;
        this.model.igstAmount = 0;
        this.model.cgstPer = 0;
        this.model.cgstAmount = 0;
      }
      if (this.model.taxarea === 'INTER') {
        this.sgstPerInputbox.className = 'flex-1 readonly';
        this.igstPerInputbox.className = 'flex-1';
        this.cgstPerInputbox.className = 'flex-1 readonly';
        this.sgstPerInputbox.templateOptions.readonly = true;
        this.igstPerInputbox.templateOptions.readonly = false;
        this.cgstPerInputbox.templateOptions.readonly = true;
        this.model.sgstPer = 0;
        this.model.sgstAmount = 0;
        this.model.cgstPer = 0;
        this.model.cgstAmount = 0;
      }
      this.model = { ...this.model }
    }
  }

  private get rateInputbox() {
    return this.steps.find(e => e.id === 'bill-amount-details').fields.find(e => e.id === 'row-1').fieldGroup.find(e => e)
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'rate')
  }

  private get quantityInputbox() {
    return this.steps.find(e => e.id === 'bill-amount-details')
      .fields.find(e => e.id === 'row-1').fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'quantity')
  }

  private get sgstPerInputbox() {
    return this.steps.find(e => e.id === 'bill-amount-details')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'sgstPercent')
  }

  private get cgstPerInputbox() {
    return this.steps.find(e => e.id === 'bill-amount-details')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-3')
      .fieldGroup.find(e => e.key === 'cgstPercent')
  }

  private get igstPerInputbox() {
    return this.steps.find(e => e.id === 'bill-amount-details')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-4')
      .fieldGroup.find(e => e.key === 'igstPercent')
  }

  private get kfcPerInputbox() {
    return this.steps.find(e => e.id === 'bill-amount-details')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.id === 'row-5')
      .fieldGroup.find(e => e.key === 'kfcper')
  }

  private get grossAmountInputbox() {
    return this.steps.find(e => e.id === 'bill-amount-details')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-3')
      .fieldGroup.find(e => e.key === 'grossAmount')
  }

  private get gstPerInputbox() {
    return this.steps.find(e => e.id === 'bill-amount-details')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-3')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'gstper')
  }

  private get tdsPerInputbox() {
    return this.steps.find(e => e.id === 'bill-amount-details')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-3')
      .fieldGroup.find(e => e.id === 'row-2')
      .fieldGroup.find(e => e.key === 'tdsPercent')
  }

  private get lwPerInputbox() {
    return this.steps.find(e => e.id === 'bill-amount-details')
      .fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.id === 'row-4')
      .fieldGroup.find(e => e.key === 'labourWelfarePercent')
  }

  private listenBillCostChange() {
    // this.rateInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
    //   this.model['grossAmount'] = this.model.rate * this.model.quantity
    //   this.model = { ...this.model };
    // }
    // this.quantityInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
    //   this.model['grossAmount'] = this.model.rate * this.model.quantity
    //   this.model = { ...this.model };
    // }
    this.sgstPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.sgstAmount = this.model['grossAmount'] * (this.model.sgstPer / 100);
      this.model = { ...this.model };
    }
    this.cgstPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.cgstAmount = this.model['grossAmount'] * (this.model.cgstPer / 100);
      this.model = { ...this.model };
    }
    this.igstPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.igstAmount = this.model['grossAmount'] * (this.model.igstPercent / 100);
      this.model = { ...this.model };
    }
    this.kfcPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.kfcAmount = this.model['grossAmount'] * (this.model.kfcPercent / 100);
      this.model = { ...this.model };
    }
    this.tdsPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.tdsAmount = this.model['grossAmount'] * (this.model.tdsPercent / 100);
      this.model = { ...this.model };
    }
    this.lwPerInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.model.labourWelfareAmount = this.model['grossAmount'] * (this.model.labourWelfarePercent / 100);
      this.model = { ...this.model };
    }
  }

  ngOnDestroy() {
    this.form.reset();
    this.projectDivisionFieldsHandler.clear();
  }

}
