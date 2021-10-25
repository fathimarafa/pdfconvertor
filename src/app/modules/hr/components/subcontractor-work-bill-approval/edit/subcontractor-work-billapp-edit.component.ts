import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { FormfieldHandler, ModalFormFields } from '../../subcontractor-work-bill/handlers/form-field.handler';
import { SubContractorWorkOrder, SubContractorWorkOrderDetails } from '../../subcontractor-work-order/definitions/subcontractor-work-order.definition';
import { SubcontractorWorkOrderMetadata } from '../../subcontractor-work-order/subcontractor-work-order.configuration';
import { SelectionModel } from '@angular/cdk/collections';
import { SubcontractorBillApprovalMetadata } from '../subcontractor-work-bill-approval.configuration';
import { SubcontractorBill, SubcontractorBillDetails } from '../../subcontractor-work-bill/definitions/subcontractor-work-bill.definition';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { AdditionalBillappComponent } from './additional-bill/additional-billapp.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';


@Component({
  selector: 'app-subcontractor-work-billapp-edit',
  templateUrl: './subcontractor-work-billapp-edit.component.html',
  styleUrls: ['./subcontractor-work-billapp-edit.component.css']
})
export class SubcontractorWorkBillappEditComponent implements OnInit {

  module;
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  fields:FormlyFieldConfig[];
  detailsForm = new FormGroup({});
  detailsModel;
  detailsOptions: FormlyFormOptions = {};
  detailsFields: FormlyFieldConfig[];
  subscribeProjectDivison: Subscription;
  totalAmount:0;
  enableStockEdit: boolean;
  model: SubcontractorBill;
  selection = new SelectionModel<SubContractorWorkOrder>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  BillnoDataset: any;

  constructor(
    private dialogRef: MatDialogRef<SubcontractorWorkBillappEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: SubcontractorBill,
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,   
    private router: Router,
    private dialog: MatDialog,
   private snackBar: MatSnackBar,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private employeeService: EmployeeService
  ) {


    this.module = SubcontractorBillApprovalMetadata;
    this.tableColumns = this.module.subcontractorBillDetails.tableColumns;
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.model = this.editData;
    this.fields = SubcontractorBillApprovalMetadata.formFields;
    this.model = this.editData;
    this.detailsFields = SubcontractorBillApprovalMetadata.subcontractorBillDetails.formFields;
    this.detailsModel = this.editData;
    this.defineModalForms();
    this.loadDropdowns();
    this.bindFormSelectOptions();
  }


  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<SubcontractorBillDetails> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.issued.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);

  }

  
  bindFormSelectOptions() {
    this.fetchSubcontractorSelectOptions();
    this.bindProjectDivisionFields();
    if(this.modalForms.issued.model.blockId == null || this.modalForms.issued.model.unitId == null || this.modalForms.issued.model.floorId == null){
      this.modalForms.issued.model.blockId = 0;
      this.modalForms.issued.model.unitId = 0;
      this.modalForms.issued.model.floorId = 0;
    }
    FormfieldHandler.projectDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      // this.modalForms.issued.form.reset();
      this.fetchWorkOrderSelectOptions();
    }
    FormfieldHandler.subcontractorDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchWorkOrderSelectOptions();
      this.fetchPaymentasperattendance();
      
    }
    FormfieldHandler.workorderDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchWorkBillnoSelectOptions();
    //  this.PreviousSubBillSelectOptions() 
   
    }
  }

  loadItemDetails() {
    if (this.isEdit) {
      console.log("",this.modalForms.issued.model.workOrderId);
      console.log("",this.modalForms.issued.model.id);
        const endpoint = `${'BuildExeHR/api/SubcontractorPreviousSubBill'}/${this.modalForms.issued.model.id}/${this.modalForms.issued.model.workOrderId}`;
        this.dataHandler.get(endpoint).subscribe((res: any[]) => {
          this.totalAmount = 0;
          res.forEach(e => {
            e['totalqty'] =  e.previousBillQty + e.currentQuantity;
            e['netAmount'] = e.totalqty* e.workRate;
            e['category'] = e.currentQuantity * e.workRate;
            // const negotiatedAmount = e.currentQuantity * e.workRate;
            // const tax = negotiatedAmount * (e.tax / 100);
            // const discount = negotiatedAmount * (e.disount / 100);
            e['negotiatedAmount'] =  e.totalqty* e.workRate;
            this.totalAmount = this.totalAmount + e['negotiatedAmount'];
            this.detailsModel.netAmount =this.totalAmount;
            // this.detailsModel.othercharge=0;
            // this.detailsModel.taxamount=0;
            // this.detailsModel.amountRetensionAmount=0;
            // this.detailsModel.amountTdsAmount=0;
            // this.detailsModel.amountTdsPercent=0;
            // this.detailsModel.amountRetensionPercent=0;
            if (this.detailsModel.taxtype === 'INTRA STATE') {
              this.sgstPerInputbox.className = 'flex-1';
              this.igstPerInputbox.className = 'flex-1 readonly';
              this.cgstPerInputbox.className = 'flex-1 readonly';
              this.sgstPerInputbox.templateOptions.readonly = false;
              this.igstPerInputbox.templateOptions.readonly = true;
              this.cgstPerInputbox.templateOptions.readonly = false;
              this.detailsModel.sgstPercent = (this.detailsModel.tax)/2;
              this.detailsModel.sgstAmt = (this.totalAmount)*(this.detailsModel.sgstPercent)/100;
              this.detailsModel.cgstPercent = (this.detailsModel.tax)/2;
              this.detailsModel.cGSTAmt = this.detailsModel.sgstAmt;
              this.detailsModel.igstPercent = 0;
              this.detailsModel.igstAmt = 0;
              // this.detailsModel.amountRetensionAmount=(this.totalAmount)*(this.detailsModel.amountRetensionPercent)/100;
              // this.detailsModel.netAmount =(this.totalAmount+this.detailsModel.sgstAmt+this.detailsModel.cGSTAmt)-(this.detailsModel.amountRetensionAmount);
              this.detailsModel.taxamount=this.detailsModel.sgstAmt+this.detailsModel.cGSTAmt;
              this.calculateNetAmount();
            }
            if (this.detailsModel.taxtype === 'INTER STATE') {
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
              this.detailsModel.igstPercent = this.detailsModel.tax;
              this.detailsModel.igstAmt =(this.totalAmount)*(this.detailsModel.igstPercent)/100;
              // this.detailsModel.amountRetensionAmount=(this.totalAmount)*(this.detailsModel.amountRetensionPercent)/100;
              // this.detailsModel.netAmount =(this.totalAmount+this.detailsModel.igstAmt)-(this.detailsModel.amountRetensionAmount);
              this.detailsModel.taxamount=this.detailsModel.igstAmt;
              this.calculateNetAmount();
            }
            this.detailsModel = { ...this.detailsModel};
            
          })
            this.dataSource = new MatTableDataSource(res)
            // this.calculateNetAmount();
        });
      
    } else {
        this.dataSource = new MatTableDataSource([]);
    }
}




  // fetchWorkOrderSelectOptions() {
  //   // const user = this.authService.loggedInUser;
  //   const dummyprojectId = 1008; const dummyUnitId = 0; const dummyBlockId = 5; const dummyFloorId = 1; 
  //   this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
  //   const quueryData = {...this.model} as any;
  //   const endPoint = `${SubcontractorWorkOrderMetadata.serviceEndPoint}/${dummyprojectId}/${dummyUnitId}/${dummyBlockId}/${dummyFloorId}/${quueryData.subContractorId}`;
  //   this.dataHandler.get<any[]>(endPoint)
  //     .subscribe((res: any[]) => {
  //       if (res) {
  //         FormfieldHandler.workorderDropdown.templateOptions.options = res.map((e: any) => (
  //           {
  //             label: e.workOrderNo,
  //             value: e.id
  //           }
  //         ));
  //       }
  //     });
  // }

  fetchWorkOrderSelectOptions() {
    const user = this.authService.loggedInUser;
    // const dummyprojectId = 1008; const dummyUnitId = 0; const dummyBlockId = 5; const dummyFloorId = 1; 
    // const dummyforemanId = 13;
    const subContractorId = this.modalForms.issued.model.subContractorId;
    const projectId = this.modalForms.issued.model.projectId;
    const blockId = this.modalForms.issued.model.blockId;
    const unitId = this.modalForms.issued.model.unitId;
    const floorId = this.modalForms.issued.model.floorId;
    const endPoint = `${SubcontractorBillApprovalMetadata.dropdownEndpoints.workno}/${projectId}/${unitId}/${blockId}/${floorId}/${subContractorId}`;
    this.dataHandler.get<any[]>(endPoint)
      .subscribe((res: any[]) => {
        if (res) {
        // this.WorknoDataset=res;
          FormfieldHandler.workorderDropdown.templateOptions.options = res.map((e: any) => (
            {
              label: e.workOrderNo,
              value: e.id
            }
          ));
        }
      //  this.fetchWorkBillnoSelectOptions();
      });
  }


  // fetchWorkOrderSelectOptions() {

  //   this.dataHandler.get<any[]>(this.workorderServiceUrl)
  //       .subscribe((res: any[]) => {
  //         if (res) {
  //           FormfieldHandler.workorderDropdown.templateOptions.options = res.map((e: any) => (
  //             {
  //               label: e.workOrderNo,
  //               value: e.id
  //             }
  //           ));
  //           }
  //       });
  // }

  // get workorderServiceUrl() {
  //   const user = this.authService.loggedInUser;
  //   const dummyprojectId = 1008;
  //   return `${SubcontractorWorkOrderMetadata.serviceEndPoint}/${dummyprojectId}/${user.companyId}/${user.branchId}`;
  // }


  ngOnInit() {
  //  this.onPrepareBtnClick();
  this.listenTaxAreaChange();
  this.listenNetAmountChange();
  }

  onPrepareBtnClick() {
    // if (this.modalForms.issued.valid) {
      // const dummyCompanyId = 1; const dummyBranchId = 2;
      console.log("",this.modalForms.issued.model.workOrderId);
      console.log("",this.modalForms.issued.model.billno);
      // this.PreviousSubBillSelectOptions();
      const endpoint = `${'BuildExeHR/api/SubcontractorPreviousSubBill'}/${0}/${this.modalForms.issued.model.workOrderId}`;
        this.dataHandler.get(endpoint).subscribe((res: any[]) => {
          this.totalAmount = 0;
          res.forEach(e => {
            e['totalqty'] =  e.previousBillQty + e.currentQuantity;
            e['netAmount'] = e.totalqty* e.workRate;
            e['category'] = e.currentQuantity * e.workRate;
            // const negotiatedAmount = e.currentQuantity * e.workRate;
            // const tax = negotiatedAmount * (e.tax / 100);
            // const discount = negotiatedAmount * (e.disount / 100);
            e['negotiatedAmount'] =  e.totalqty* e.workRate;
            this.totalAmount = this.totalAmount + e['negotiatedAmount'];
            this.detailsModel.netAmount =this.totalAmount;
            this.detailsModel.othercharge=0;
            this.detailsModel.taxamount=0;
            this.detailsModel.amountRetensionAmount=0;
            this.detailsModel.amountTdsAmount=0;
            this.detailsModel.amountTdsPercent=0;
            this.detailsModel.amountRetensionPercent=0;
            this.detailsModel = { ...this.detailsModel};
            
          })
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
         

        });
    // }
  }


  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: SubcontractorBillApprovalMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: SubcontractorBillApprovalMetadata.subcontractorBillDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields,this.detailsFields);
    this.loadDropdowns();
    this.loadItemDetails();
    this.dataSource = new MatTableDataSource(this.editData.subcontractorBillDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    // this.fetchSubcontractorSelectOptions();
    // this.bindProjectDivisionFields();
    // this.fetchWorkOrderSelectOptions();
  }

  onSaveBtnClick() {
    // if (this.modalForms.issued.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.modalForms.issued.model
        }
        this.dialogRef.close(closeEvent);
      });
    // }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  // get httpRequest(): Observable<SubcontractorBill > {
  //   let payload = {
  //     ...this.modalForms.issued.model,
  //     materialUsageDetails: this.dataSource.data,
  //   }
  //   if (this.isEdit) {
  //     return this.dataHandler.put<SubcontractorBill>( SubcontractorBillMetadata .serviceEndPoint, [payload]);
  //   } else {
  //     const dummyDefaultFields = {
  //       companyId: 1,
  //       branchId: 1,
  //       userId: 1
  //     }
  //     payload = { ...payload, ...dummyDefaultFields }
  //     return this.dataHandler.post<SubcontractorBill >( SubcontractorBillMetadata .serviceEndPoint, [payload]);
  //   }
  // }


  get httpRequest(): Observable<SubcontractorBill> {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    let payload: any = this.modalForms.issued.model;
    payload.subcontractorBillDetails = this.dataSource.data;
    payload.detailsModel=this.detailsModel;
    if (this.isEdit) {
      return this.dataHandler.put<SubcontractorBill>(SubcontractorBillApprovalMetadata.serviceEndPoint, [payload]);
    } else {
      payload.isDeleted = 0;
      return this.dataHandler.post<SubcontractorBill>(SubcontractorBillApprovalMetadata.serviceEndPoint, [payload]);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      const columns = this.tableColumns.map(col => col.field);
      return columns;
    } else {
      return [];
    }
  }

  onUserInput($event, row, column) {
    row[column] = $event.target.value;
    row.currentQuantity = Number(row.currentQuantity);
    row['category'] = row.currentQuantity * row.workRate;
    row['negotiatedAmount']=row.currentQuantity * row.workRate;
    row['totalqty'] = row.previousBillQty+row.currentQuantity;
    row['netAmount'] = row.totalqty* row.workRate;
    this.detailsModel.netAmount=row.negotiatedAmount;
    this.detailsModel = { ...this.detailsModel};
   
    this.calculateItemDetailsTableTotal();
  }


  calculateItemDetailsTableTotal() {
    this.totalAmount = 0;
    this.dataSource.data.forEach((row) => {
      this.totalAmount = this.totalAmount + row['negotiatedAmount'];
    });
    // this.calculateNetAmount();
    this.detailsModel.netAmount =this.totalAmount;
            this.detailsModel = { ...this.detailsModel};
  }


  private get taxTypeDropdown() {
    return this.detailsFields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.key === 'taxInclusive')
  }

  private get taxAreaDropdown() {
    return this.detailsFields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.key === 'taxtype')
  }

  private listenTaxAreaChange() {
    this.taxAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      if (this.detailsModel.taxtype === 'INTRA STATE') {
        this.sgstPerInputbox.className = 'flex-1';
        this.igstPerInputbox.className = 'flex-1 readonly';
        this.cgstPerInputbox.className = 'flex-1 readonly';
        this.sgstPerInputbox.templateOptions.readonly = false;
        this.igstPerInputbox.templateOptions.readonly = true;
        this.cgstPerInputbox.templateOptions.readonly = false;
        this.detailsModel.sgstPercent = (this.detailsModel.tax)/2;
        this.detailsModel.sgstAmt = (this.totalAmount)*(this.detailsModel.sgstPercent)/100;
        this.detailsModel.cgstPercent = (this.detailsModel.tax)/2;
        this.detailsModel.cGSTAmt = this.detailsModel.sgstAmt;
        this.detailsModel.igstPercent = 0;
        this.detailsModel.igstAmt = 0;
        // this.detailsModel.amountRetensionAmount=(this.totalAmount)*(this.detailsModel.amountRetensionPercent)/100;
        // this.detailsModel.netAmount =(this.totalAmount+this.detailsModel.sgstAmt+this.detailsModel.cGSTAmt)-(this.detailsModel.amountRetensionAmount);
        this.detailsModel.taxamount=this.detailsModel.sgstAmt+this.detailsModel.cGSTAmt;
        this.calculateNetAmount();
      }
      if (this.detailsModel.taxtype === 'INTER STATE') {
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
        this.detailsModel.igstPercent = this.detailsModel.tax;
        this.detailsModel.igstAmt =(this.totalAmount)*(this.detailsModel.igstPercent)/100;
        // this.detailsModel.amountRetensionAmount=(this.totalAmount)*(this.detailsModel.amountRetensionPercent)/100;
        // this.detailsModel.netAmount =(this.totalAmount+this.detailsModel.igstAmt)-(this.detailsModel.amountRetensionAmount);
        this.detailsModel.taxamount=this.detailsModel.igstAmt;
        this.calculateNetAmount();
      }
      // this.detailsModel.netAmount =(this.totalAmount)-(this.detailsModel.amountRetensionAmount);
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

  private listenNetAmountChange() {
    //transportation charge
    // FormfieldHandler.transportChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
    //   this.modalForms.transferCharges.model.transportationPer = (this.modalForms.transferCharges.model.transportationCharge / this.totalAmount) * 100;
    //   this.calculateNetAmount();
    // }
    // FormfieldHandler.transportChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
    //   this.modalForms.transferCharges.model.transportationCharge = (this.totalAmount * this.modalForms.transferCharges.model.transportationPer) / 100
    //   this.calculateNetAmount();
    // }
    // // loading charge
    FormfieldHandler.amountTdsAmountInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.detailsModel.amountTdsAmount = (this.totalAmount * this.detailsModel.amountTdsPercent) / 100;
      this.detailsModel = { ...this.detailsModel};
      this.calculateNetAmount();
    }
    
    FormfieldHandler.retensionInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.detailsModel.amountRetensionAmount = (this.totalAmount * this.detailsModel.amountRetensionPercent) / 100;
      this.detailsModel = { ...this.detailsModel};
      this.calculateNetAmount();
    }
    //other charge
    FormfieldHandler.otherChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      // this.modalForms.transferCharges.model.othercharge = (this.modalForms.transferCharges.model.otherCharges / this.totalAmount) * 100;
      console.log("hai");
      this.calculateNetAmount();
    }
    // FormfieldHandler.otherChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
    //   this.modalForms.transferCharges.model.otherCharges = (this.totalAmount * this.modalForms.transferCharges.model.otherChargesPer) / 100
    //   this.calculateNetAmount();
    // }
  }

  private calculateNetAmount() {
    this.detailsModel.netAmount = (this.totalAmount+ this.detailsModel.taxamount+this.detailsModel.othercharge)-(this.detailsModel.amountRetensionAmount+ this.detailsModel.amountTdsAmount);
    this.detailsModel = { ...this.detailsModel};
    console.log("",this.detailsModel.netAmount);
    // this.detailsModel.model = { ...this.detailsModel.model };
  }



  onAdditionalbillBtnClick(rowToEdit?: SubContractorWorkOrder) {
    this.dialogEventHandler.openDialog(
      AdditionalBillappComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }
  private affectedRowIndex(affectedRow?: SubContractorWorkOrder) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: SubContractorWorkOrder) => row.id === affectedRow.id);
    }
    return indexToUpdate;
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


  private fetchSubcontractorSelectOptions() {
    this.employeeService.getSubContractor().subscribe((res) => {
      if (res) {
        FormfieldHandler.subcontractorDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.id
          }
        ));
      }
    //  this.fetchWorkOrderSelectOptions()
    });
  }

  fetchWorkBillnoSelectOptions() {
    const user = this.authService.loggedInUser;
    const dummytype = 1; 
    console.log("wid",this.modalForms.issued.model.workOrderId);
    const endPoint = `${'BuildExeHR/api/MaxNo'}/${dummytype}/${this.modalForms.issued.model.workOrderId}/${1}`;
    this.dataHandler.get<any[]>(endPoint)
      .subscribe((res: any[]) => {
        if (res) {
          this.modalForms.issued.model['billno']=String(res);
          console.log("bill",this.modalForms.issued.model.billno);
          this.modalForms.issued.model = { ...this.modalForms.issued.model};
        }
      });
    }

    
fetchPaymentasperattendance(){
  const endpoint = `${'BuildExeHR/api/SubContractorAttendanceList'}`;
  const data = this.modalForms.issued.model;
  console.log('model', this.modalForms.issued.model);
  this.dataHandler.post(endpoint, data)
    .subscribe((res: any[]) => {
      // if (res) {
        this.detailsModel['amountAsPerAttendance']= res;
        console.log("amountAsPerAttendance",this.detailsModel.amountAsPerAttendance);
        this.detailsModel = { ...this.detailsModel};
        this.modalForms.issued.model = { ...this.modalForms.issued.model};
      // }
    });
}

    openApproveRemarkDialog(isApproved: boolean): void {
      const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.saveChanges(isApproved);
          }
      });
  }
  
  get isEditedFromApproval() {
      return this.router.url.includes('approval');
  }
  

    onApproveBtnClick() {
      const isApproved = true;
      this.openApproveRemarkDialog(isApproved);
    }
    
    onRejectBtnClick() {
      const isApproved = false;
      this.openApproveRemarkDialog(isApproved);
      this.modalForms.issued.model.approvalLevel= this.modalForms.issued.model.approvalLevel-1;
    }
    
    saveChanges(isApproved: boolean) {
         
      if (isApproved) {
      //   this.selectedIndent.approvalLevel++;
      //   this.selectedIndent.approvedBy = this.authService.loggedInUser.userId;
      //   this.selectedIndent.approvedDate = new Date();
      // } else {
      //   this.selectedIndent.approvalLevel--;
      
      if(this.modalForms.issued.model.maxlevel > this.modalForms.issued.model.approvalLevel)
      {
       this.modalForms.issued.model.approvalLevel++;
       this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
       this.modalForms.issued.model.approvedDate = new Date();
       }
       else
       {
         if(this.modalForms.issued.model.maxlevel < this.modalForms.issued.model.approvalLevel)
           {
             this.modalForms.issued.model.approvalLevel=0;
             // this.modalForms.issued.model.approvalStatus=0;
             this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
             this.modalForms.issued.model.approvedDate = new Date();
           }
       }
       if(this.modalForms.issued.model.maxlevel===this.modalForms.issued.model.approvalLevel)
       {
         this.modalForms.issued.model.approvalStatus=1;
         this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
         this.modalForms.issued.model.approvedDate = new Date();
       }
     
     
    }  
    console.log("", this.modalForms.issued.model.approvalLevel);
    console.log("", this.modalForms.issued.model.approvalStatus);
    
    // this.modalForm.indent.model.indentDetails = this.itemDatasource.data;
    let payload: any = this.modalForms.issued.model
    payload.subContractorWorkOrderDetails = this.dataSource.data;
    // this.dataHandler.put<SubContractorWorkOrder>(this.module.serviceEndPoint, [payload]).subscribe((res) => {
    // this.snackBar.open(`SubContractorWorkOrder ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
        this.dataHandler.put<SubcontractorBill>(this.module.serviceEndPoint, [payload]).subscribe((res) => {
        this.snackBar.open(`SubcontractorBill ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
        this.dialogRef.close();
     
      })
    }


  //    PreviousSubBillSelectOptions() {
  //       const user = this.authService.loggedInUser;
  //       const dummytype = 1; 
  //       const endPoint = `${'BuildExeHR/api/SubContractorPreviousSubBill'}/${this.modalForms.issued.model.workOrderId}/${this.modalForms.issued.model.billno}`;
  //       this.dataHandler.get<any[]>(endPoint)
  //         .subscribe((res: any[]) => {
  //           if (res) {
  //             const dataRow: any = Object.assign({}, this.modalForms.issued.model);
  //             dataRow['previousBillQty'] = res[0].previousBillQty;
  //           }
  //         });  
  // }

  
  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: SubcontractorBillDetails) {
    this.enableStockEdit = true;
    this.modalForms.usage.model = rowToEdit;
  }

  onUpdateStockBtnClick() {

  }

  onCancelStockUpdateBtnClick() {

  }

  ngOnDestroy() {
    this.modalForms.issued.form.reset();
    this.modalForms.usage.form.reset();
    this.projectDivisionFieldsHandler.clear();

  }

}