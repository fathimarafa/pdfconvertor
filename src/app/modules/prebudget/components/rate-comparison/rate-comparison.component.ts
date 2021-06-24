import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { RateComparisonEditComponent } from './edit/rate-comparison-edit.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { RateComparisonMetadata } from './rate-comparison.configuration';
import { RateComparison } from './definitions/rate-comparison.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { FormfieldHandler } from './handlers/form-field.handler';
import { ProjectSpecificationMetadata } from '../project-specification/project-specification.configuration';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { RateEvaluationEditComponent } from '../rate-evaluation/edit/rate-evaluation-edit.component';
import { ProjectSpecification } from '../project-specification/definitions/project-specification.definition';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rate-comparison',
  templateUrl: './rate-comparison.component.html',
  styleUrls: ['./rate-comparison.component.css']
})
export class RateComparisonComponent implements OnInit {

  module;
  tableColumns;
  dataSource;

  form = new FormGroup({});
  model: RateComparison = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  totalRate;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private snackbar: MatSnackBar
  ) {
    this.module = RateComparisonMetadata;
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() {
    this.tableColumns = this.module.tableColumns
    this.fields = this.module.formFields;
    FormfieldHandler.initialize(this.fields);
    this.bindProjectDivisionFields();
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<RateComparison> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.model,
      isEdit: true
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }

  // fetchData() {
  //   this.dataHandler.get<RateComparison[]>(this.module.serviceEndPoint)
  //     .subscribe((res: RateComparison[]) => {
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.paginator = this.paginator;
  //     });
  // }

  openDialog(rowToEdit?: RateComparison) {
    this.dialogEventHandler.openDialog(
      RateEvaluationEditComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }

  onShowBtnClick() {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    this.fetchSpecList();
  }

  private fetchSpecList() {
    let totalAmount = {
      'deptAmt': { name: 'Department Total', value: 0 },
      'marktAmt': { name: 'Market Total', value: 0 },
      'specAmt': { name: 'Spec Total', value: 0 },
      'quotedAmt': { name: 'Negotiated Total', value: 0 },
    }
    this.dataHandler.get<any[]>(this.speclistServiceUrl).subscribe((res: any[]) => {
      if (res && res.length) {
        res.forEach(spec => {
          ['dept', 'markt', 'spec', 'quoted'].forEach(key => {
            spec[`${key}Amt`] = spec[`${key}RatePerUnit`] * spec.quantityRequired;
            totalAmount[`${key}Amt`].value = totalAmount[`${key}Amt`].value + spec[`${key}Amt`];
          });
        });
        this.totalRate = Object.values(totalAmount);
      } else {
        this.snackbar.open('No data found');
      }

      this.dataSource = new MatTableDataSource(res || []);
    });
  }

  private get speclistServiceUrl() {
    //:projectId/:UnitId/:Blockid/:Floord
    return `${ProjectSpecificationMetadata.serviceEndPoint}/${this.model.projectId}/${this.model.unitId}/${this.model.blockId}/${this.model.floorId}`
  }


  openDeleteDialog(rowToDelete: RateComparison): void {
    const dataToComponent = {
      endPoint: `${this.module.serviceEndPoint}/${rowToDelete.id}/${this.authService.loggedInUser.userId}`,
      deleteUid: rowToDelete.id
    }
    this.dialogEventHandler.openDialog(
      ConfirmModalComponent,
      this.dataSource,
      dataToComponent,
      this.affectedRowIndex(rowToDelete)
    )
  }

  private affectedRowIndex(rowToEdit?: RateComparison): number {
    let indexToUpdate;
    if (rowToEdit) {
      indexToUpdate = this.dataSource.data.findIndex((row: RateComparison) => row.id === rowToEdit.id);
    }
    return indexToUpdate;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnDestroy() {
    this.form.reset();
    this.projectDivisionFieldsHandler.clear();
  }

}
