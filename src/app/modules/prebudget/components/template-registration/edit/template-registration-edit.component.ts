import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TemplateRegistrationMetadata } from '../template-registration.configuration';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { TemplateDetailsId, Template, TemplateDetail } from '../definitions/template-registration.definition';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppStateService } from '../../../../../services/app-state-service/app-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialRegistrationMetadata } from 'src/app/modules/material/components/material-registration/material-registration.configuration';
import { MaterialRegistration } from 'src/app/modules/material/components/material-registration/definitions/material-registration.definition';
import { LabourWorkRateSettingMetadata } from 'src/app/modules/hr/components/labour-workrate-setting/labour-workrate-setting.configuration';
import { LabourWorkRate } from 'src/app/modules/hr/components/labour-workrate-setting/definitions/labour-workrate-setting.definition';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { PrebudgetWorkTypeMetadata } from '../../work-type/work-type.configuration';
import { PrebudgetWorkType } from '../../work-type/definitions/work-type.definition';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-template-registration-edit',
  templateUrl: './template-registration-edit.component.html',
  styleUrls: ['./template-registration-edit.component.css']
})
export class TemplateRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: Template;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  editData: Template;

  detailTypes = ['material', 'subcontr', 'labour'];
  templateDetailsForm = {};
  enableRowEdit;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private router: Router,
    private stateService: AppStateService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.editData = this.stateService.getState(TemplateRegistrationMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
    this.fields = TemplateRegistrationMetadata.formFields;
    this.model = this.editData || {};
    this.defineTables();
    FormfieldHandler.loadDropdown(this.dataHandler, this.fields, this.templateDetailsForm, this.authService.loggedInUser);
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
        this.onCancelBtnClick();
      });
    }
  }

  onCancelBtnClick() {
    this.router.navigateByUrl('/home/template');
  }

  get httpRequest(): Observable<Template> {
    let payload = this.generatePayload();
    if (this.isEdit) {
      return this.dataHandler.put<Template>(TemplateRegistrationMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, userId: 0, isDelete: 0
      }
      payload = { ...dummyDefaultFields, ...payload };
      return this.dataHandler.post<Template>(TemplateRegistrationMetadata.serviceEndPoint, [payload]);
    }
  }

  private generatePayload() {
    let detailsData: TemplateDetail[] = [];
    for (let id in this.templateDetailsForm) {
      this.templateDetailsForm[id].dataSource.data.forEach((e: TemplateDetail) => {
        switch (id) {
          case TemplateDetailsId.labour:
            e.itemTypeId = 1;
            break;
          case TemplateDetailsId.subcontr:
            e.itemTypeId = 2;
            break;
          case TemplateDetailsId.material:
            e.itemTypeId = 3;
            break;
        }
        detailsData.push(e);
      });
    }
    let payload: Template = { ...this.model };
    payload.templateDetail = detailsData;
    return payload;
  }

  defineTables() {
    this.detailTypes.forEach((tab: string) => {
      this.templateDetailsForm[tab] = {
        displayName: this.getDisplayName(tab),
        dataSource: new MatTableDataSource(this.getTableRows(tab)),
        tableColumns: this.getColumns(tab),
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: JSON.parse(JSON.stringify(TemplateRegistrationMetadata.teamplateDetails.formFields))
      }
      this.templateDetailsForm[tab]['dataColumns'] = this.templateDetailsForm[tab].tableColumns.map(e => e.field);
      this.templateDetailsForm[tab].dataSource.paginator = this.paginator;
    });
  }

  getDisplayName(id) {
    switch (id) {
      case TemplateDetailsId.material:
        return 'Material';
      case TemplateDetailsId.labour:
        return 'Labour';
      case TemplateDetailsId.subcontr:
        return 'Sub Contractor';
    }
  }

  getColumns(tab: string) {
    let columns = JSON.parse(JSON.stringify(TemplateRegistrationMetadata.teamplateDetails.tableColumns));
    switch (tab) {
      case TemplateDetailsId.material:
        columns[1].displayName = 'Material';
        break;
      case TemplateDetailsId.labour:
        columns[1].displayName = 'Labour';
        break;
      case TemplateDetailsId.subcontr:
        columns[1].displayName = 'Sub Contractor';
        break;
    }
    return columns;
  }

  private getTableRows(tab: string): TemplateDetail[] {
    let tableRows: TemplateDetail[] = [];
    if (this.isEdit) {
      switch (tab) {
        case TemplateDetailsId.labour:
          tableRows = this.model.templateDetail.filter(e => e.itemTypeId === 1);
          break;
        case TemplateDetailsId.subcontr:
          tableRows = this.model.templateDetail.filter(e => e.itemTypeId === 2);
          break;
        case TemplateDetailsId.material:
          tableRows = this.model.templateDetail.filter(e => e.itemTypeId === 3);
          break;
      }
      tableRows.forEach((row: TemplateDetail) => {
        row['amount'] = row.itemQty * row.itemRate;
      })
    }
    return tableRows;
  }

  onAddDetailBtnClick(detailId: string) {
    if (Object.values(this.templateDetailsForm[detailId].form.value).includes(null)) return;
    const data = Object.assign({}, this.templateDetailsForm[detailId].form.value);
    data['amount'] = data.itemQty * data.itemRate;
    this.templateDetailsForm[detailId].dataSource.data.push(Object.assign({}, data));
    this.templateDetailsForm[detailId].dataSource._updateChangeSubscription();
    this.templateDetailsForm[detailId].form.reset();
  }

  onDeleteRowBtnClick(detailId: string, index) {
    this.templateDetailsForm[detailId].dataSource.data.splice(index, 1);
    this.templateDetailsForm[detailId].dataSource._updateChangeSubscription();
  }

  onEditRowBtnClick(detailId: string, row: TemplateDetail) {
    this.templateDetailsForm[detailId].model = Object.assign({}, row);
    this.enableRowEdit = true;
  }

  onUpdateDetailBtnClick(detailId: string) {
    this.onCancelUpdateBtnClick(detailId);
  }

  onCancelUpdateBtnClick(detailId: string) {
    this.templateDetailsForm[detailId].form.reset();
    this.enableRowEdit = false;
  }

  ngOnDestroy() {
    this.form.reset();
    if (this.isEdit) {
      this.stateService.clear(TemplateRegistrationMetadata.moduleId);
    }
  }

}
