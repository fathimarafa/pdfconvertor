import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Observable } from 'rxjs';
import { MaterialReceived, RecieptDetail } from '../definitions/material-received.definition';
import { MaterialRecieveMetadata } from '../material-received.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field-handler';
import { MatPaginator } from '@angular/material/paginator';
import { ReceivedToProjectDivision } from '../handlers/received-to-project-division';
import { MaterialTransferRequest, TransferDetail } from '../../material-transfer-request/definitions/material-transfer-request.definition';
import { MaterialTransferRequestMetadata } from '../../material-transfer-request/material-transfer-request.configuration';
import { Router } from '@angular/router';
import { AppStateService } from '../../../../../services/app-state-service/app-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-material-received-edit',
  templateUrl: './material-received-edit.component.html',
  styleUrls: ['./material-received-edit.component.css']
})
export class MaterialReceivedEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  hasOpeningStock: boolean;
  enableItemEdit: boolean;
  materialsTransferedList: MaterialTransferRequest[]
  editData;
  totalAmount = 0;

  transferTableColumns;
  transferDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private receivedToProjectDivision: ReceivedToProjectDivision,
    private router: Router,
    private stateService: AppStateService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.editData = this.stateService.getState(MaterialRecieveMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
      this.editData.recieptDetail.forEach((e: TransferDetail) => e['total'] = e.quantity * e.rate);
    }
    this.defineModalForms();
    this.bindProjectDivisionFields();
    this.fetchMaterialsTransfered();
  }

  bindProjectDivisionFields() {
    const projectControllerToFields: ProjectDivisionFields<any> = {
      projectDropdown: FormfieldHandler.projectToDropdown,
      blockDropdown: FormfieldHandler.blockToDropdown,
      floorDropdown: FormfieldHandler.floorToDropdown,
      unitDropdown: FormfieldHandler.unitToDropdown,
      model: this.modalForms.materialReceived.model,
      isEdit: this.isEdit
    };
    this.receivedToProjectDivision.initialize(projectControllerToFields);
  }

  ngOnInit(): void {
    this.tableColumns = MaterialRecieveMetadata.recieptDetail.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      materialReceived: {
        form: new FormGroup({}),
        model: this.editData || {},
        options: {},
        fields: MaterialRecieveMetadata.formFields
      },
      transferCharges: {
        form: new FormGroup({}),
        model: this.editData || {},
        options: {},
        fields: MaterialRecieveMetadata.transferCharges.formFields
      }
    }
    FormfieldHandler.initialize(this.modalForms.materialReceived.fields, this.modalForms.transferCharges.fields);
    this.dataSource = new MatTableDataSource(this.editData ? this.editData.recieptDetail || [] : []);
    if (this.isEdit) {
      this.calculateNetAmount();
    }
  }

  onSaveBtnClick() {
    if (this.modalForms.materialReceived.form.valid) {
      this.httpRequest.subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
        this.onCancelBtnClick();
      });
    }
  }

  onCancelBtnClick() {
    this.router.navigateByUrl('/home/materialreceived');
  }

  get httpRequest(): Observable<MaterialReceived> {
    this.receivedToProjectDivision.setProjectDivisionFieldsDefaultValue();
    let payload = {
      ...this.modalForms.materialReceived.model,
      ...this.modalForms.transferCharges.model,
      recieptDetail: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<MaterialReceived>(MaterialRecieveMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, financialYearId: 1
      }
      payload = { ...dummyDefaultFields, ...payload };
      return this.dataHandler.post<MaterialReceived>(MaterialRecieveMetadata.serviceEndPoint, [payload]);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  get transferDataColumns() {
    if (this.transferTableColumns && this.transferTableColumns.length) {
      return this.transferTableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  removeItem(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  onEditBtnClick(rowToEdit: RecieptDetail) {
    rowToEdit['editField'] = !rowToEdit['editField'];
  }

  onFieldValueChanged(ev, row: RecieptDetail, column: string) {
    if (ev.target.value) {
      row[column] = Number(ev.target.value);
      row['total'] = row.quantity * row.rate;
      this.calculateItemDetailsTableTotal();
    }
  }

  calculateItemDetailsTableTotal() {
    this.totalAmount = 0;
    this.dataSource.data.forEach((row) => {
      this.totalAmount = this.totalAmount + row['total'];
    });
    this.calculateNetAmount();
  }

  fetchMaterialsTransfered() {
    this.transferTableColumns = MaterialRecieveMetadata.transferTableColumns;
    this.dataHandler.get<MaterialTransferRequest[]>(this.materialServiceUrl)
      .subscribe((res: MaterialTransferRequest[]) => {
        let rows = res.filter(e => e.approvalStatus);
        this.transferDataSource = new MatTableDataSource(rows);
        this.transferDataSource.paginator = this.paginator;
      });
  }

  get materialServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialTransferRequestMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  get materialsTransferedToProject() {
    if (this.modalForms.materialReceived.projectIdTo) {
      return this.materialsTransferedList.filter((e) => e.projectIdTo === this.modalForms.materialReceived.projectIdTo);
    } else {
      return this.materialsTransferedList;
    }
  }

  private calculateNetAmount() {
    this.modalForms.transferCharges.model.netAmount = this.totalAmount + this.modalForms.transferCharges.model.transportationCharge + this.modalForms.transferCharges.model.loadingUnloadingCharge + this.modalForms.transferCharges.model.otherCharges + this.modalForms.transferCharges.model.miscellaneousExpense;
    this.modalForms.transferCharges.model = { ...this.modalForms.transferCharges.model };
  }

  ngOnDestroy() {
    this.modalForms.materialReceived.form.reset();
    this.modalForms.transferCharges.form.reset();
    this.receivedToProjectDivision.clear();
    if (this.isEdit) {
      this.stateService.clear(MaterialRecieveMetadata.moduleId);
    }
  }

  doFilter(value: string) {
    this.transferDataSource.filter = value.trim().toLocaleLowerCase();
  }

  onRowSelection(selected: MaterialTransferRequest) {
    this.modalForms.materialReceived.transferId = selected.id;
    this.transferDataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    let itemRow = selected.transferDetail.map(e => {
      return {
        materialId: e.materialId,
        quantity: e.quantity,
        rate: e.rate,
        tax: e.tax,
        total: e.quantity * e.rate
      }
    })
    this.dataSource = new MatTableDataSource(itemRow);
    Object.keys(this.modalForms.transferCharges.model).forEach(e => {
      this.modalForms.transferCharges.model[e] = selected[e];
    })
    this.calculateItemDetailsTableTotal();
  }

}
