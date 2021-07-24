import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { BillReceiptsMetadata } from '../bill-receipts.configuration';
import { BillReceipt } from '../definitions/bill-receipts.definition';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';
import { ProjectMetadata } from 'src/app/modules/crm/components/project/project.configuration';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { FormfieldHandler } from '../handlers/form-field.handler';

export interface StepType {
  id: string;
  label: string;
  fields: FormlyFieldConfig[];
}
@Component({
  selector: 'app-bill-receipts-edit',
  templateUrl: './bill-receipts-edit.component.html',
  styleUrls: ['./bill-receipts-edit.component.css']
})
export class BillReceiptsEditComponent implements OnInit {

  activedStep = 0;
  model: BillReceipt;
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];
  isEdit: boolean;
  isBillWise: boolean;

  tableColumns;
  dataSource;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<BillReceiptsEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: BillReceipt,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.model = this.editData;
  }

  ngOnInit(): void {
    this.steps = BillReceiptsMetadata.formFields;
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});
    this.tableColumns = BillReceiptsMetadata.billTableColumns;
    FormfieldHandler.initialize(this.steps);
    this.fetchProjectSelectOptions();
    this.listenCurrentReceiptAmountChange();
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      const columns = this.tableColumns.map(col => col.field);
      // const actionIndex = columns.findIndex((col: string) => col === 'action');
      // columns.splice(actionIndex, 1);
      columns.push('select');
      return columns;
    } else {
      return [];
    }
  }

  isAllSelected() {
    const totalSelected = this.selection.selected.length;
    const totalRows = this.dataSource.data.length;
    return totalSelected === totalRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  onSaveBtnClick() {
    this.model.recieptDetail = this.selection.selected.map(e => {
      return {
        type: 1,
        billId: e.id,
        amount: e.amount,
        discount: e.discount,
        advance: 0
      }
    })
    console.log('this.model', this.model);
    // if (this.form.valid) {
    //   this.httpRequest.subscribe((res) => {
    //     const closeEvent: IDialogEvent = {
    //       action: this.isEdit ? DialogActions.edit : DialogActions.add,
    //       data: res || this.model
    //     }
    //     this.dialogRef.close(closeEvent);
    //   })
    // }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<BillReceipt> {
    if (this.isEdit) {
      return this.dataHandler.put<BillReceipt>(BillReceiptsMetadata.serviceEndPoint.receipt, this.model);
    } else {
      return this.dataHandler.post<BillReceipt>(BillReceiptsMetadata.serviceEndPoint.receipt, this.model);
    }
  }

  projectDataset: Project[];
  private fetchProjectSelectOptions() {
    this.dataHandler.get<Project[]>(ProjectMetadata.serviceEndPoint).subscribe((res: Project[]) => {
      if (res) {
        this.projectDataset = res;
        FormfieldHandler.projectDropdown.templateOptions.options = res.map((e: Project) => (
          {
            label: e.projectId,
            value: e.id
          }
        ));
        this.listenProjectChange();
      }
    });
  }

  listenProjectChange() {
    FormfieldHandler.projectDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      const selectedProject: Project = this.projectDataset.find(e => e.id === this.model.projectId)
      if (selectedProject) {
        this.loadPendingClientBills();
        this.model['firstName'] = selectedProject.firstName;
        this.model['lastName'] = selectedProject.lastName;
        this.model['phoneNumber'] = selectedProject.phoneNumber;
        this.model['mobileNumber'] = selectedProject.mobileNumber;
        this.model['address'] = selectedProject.address;
        this.model = { ...this.model };
      }
    }
  }

  loadPendingClientBills() {
    // const endPoint = `${BillReceiptsMetadata.serviceEndPoint.pendingClientBills}/1/${this.model.projectId}/0`;
    let endPoint = 'BuildExeCRM/api/PendingClientBills/3/1008/17';
    this.dataHandler.get(endPoint).subscribe((res: any[]) => {
      this.dataSource = new MatTableDataSource(res);
    })
  }

  onReceiptSelection(event, row) {
    event.stopPropagation();
    row.isSelected = !row.isSelected;
    if (row.isSelected) {
      this.model['billAmount'] = this.model['billAmount'] + row.billAmount;
      this.model['balanceAmount'] = this.model['balanceAmount'] + row.balanceAmount;
    } else {
      this.model['billAmount'] = this.model['billAmount'] - row.billAmount;
      this.model['balanceAmount'] = this.model['balanceAmount'] - row.balanceAmount;
    }
    this.model['paidAmount'] = this.model['billAmount'] - this.model['balanceAmount'];
    this.model = { ...this.model };
  }

  private listenCurrentReceiptAmountChange() {
    FormfieldHandler.currentReceiptAmountInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.calculateNetAmount();
    }
    FormfieldHandler.discountAmountInputbox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.calculateNetAmount();
    }
  }

  private calculateNetAmount() {
    this.model['netamount'] = this.model['amount'] - this.model['discount'];
    this.model = { ...this.model };
  }

  onBillWiseSelection(event) {
    event.stopPropagation();
    this.isBillWise = !this.isBillWise;
    if (this.isBillWise) {
      let columns = [
        {
          field: 'amount',
          displayName: 'Amount',
          isEditable: true
        },
        {
          field: 'discount',
          displayName: 'Discount',
          isEditable: true
        }
      ];
      this.tableColumns = this.tableColumns.concat(columns);
    } else {
      this.tableColumns.splice((this.tableColumns.length - 2), 2)
    }
  }

  ngOnDestroy() {
    this.form.reset();
  }

}
