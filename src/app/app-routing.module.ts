import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/common/login/login.component';
import { HomeComponent } from './modules/common/home/home.component';
import { ModuleDefaultComponent } from './modules/common/module-default/module-default.component';
import { ApproveLevelComponent } from './modules/feature/approve-level/approve-level.component';
import { CompanyComponent } from './modules/feature/company/company.component';
import { UserComponent } from './modules/feature/user/user.component';
import { ProjectEnquiryComponent } from './modules/feature/project-enquiry/project-enquiry.component';
import { UserGroupComponent } from './modules/feature/user-group/user-group.component';
import { EnquiryModeComponent } from './modules/feature/enquiry-mode/enquiry-mode.component';
import { EnquiryStatusComponent } from './modules/feature/enquiry-status/enquiry-status.component';
import { EnquiryForComponent } from './modules/feature/enquiry-for/enquiry-for.component';
import { FollowUpComponent } from './modules/feature/follow-up/follow-up.component';
import { ProjectComponent } from './modules/feature/project/project.component';
import { ProjectBookingComponent } from './modules/feature/project-booking/project-booking.component';
import { MaterialRegistrationComponent } from './modules/feature/material-registration/material-registration.component';
import { SupplierRegistrationComponent } from './modules/feature/supplier-registration/supplier-registration.component';
import { EmployeeDesignationRegistrationComponent } from './modules/feature/employee-designation-registration/employee-designation-registration.component';
import { WorkingHoursSettingComponent } from './modules/feature/working-hours-setting/working-hours-setting.component';
import { LabourWorkrateSettingComponent } from './modules/feature/labour-workrate-setting/labour-workrate-setting.component';
import { EmployeeRegistrationComponent } from './modules/feature/employee-registration/employee-registration.component';
import { ForemanWorkOrderComponent } from './modules/feature/foreman-work-order/foreman-work-order.component';
import { HolidaySettingComponent } from './modules/feature/holiday-setting/holiday-setting.component'
import { SalaryHeadCreationComponent } from './modules/feature/salary-head-creation/salary-head-creation.component';
import { LeaveSettingComponent } from './modules/feature/leave-setting/leave-setting.component';
import { UnitRegistrationComponent } from './modules/feature/unit-registration/unit-registration.component';
import { DepartmentComponent } from './modules/feature/department/department.component';
import { ProjectFloorRegistrationComponent } from './modules/feature/project-floor-registration/project-floor-registration.component';
import { ProjectBlockRegistrationComponent } from './modules/feature/project-block-registration/project-block-registration.component';
import { AssignBlockFloorComponent } from './modules/feature/assign-block-floor/assign-block-floor.component';
import { TeamComponent } from './modules/feature/team/team.component';
import { ConsultancyWorkComponent } from './modules/feature/consultancy-work/consultancy-work.component';
import { MaterialIndentCreationComponent } from './modules/feature/material-indent-creation/material-indent-creation.component';
import { MaterialIndentApprovalComponent } from './modules/feature/material-indent-approval/material-indent-approval.component';
import { DamageStockEntryComponent } from './modules/feature/damage-stock-entry/damage-stock-entry.component';
import { MaterialBrandRegistrationComponent } from './modules/feature/material-brand-registration/material-brand-registration.component';
import { MaterialCategoryRegistrationComponent } from './modules/feature/material-category-registration/material-category-registration.component';
import { MaterialIssueComponent } from './modules/feature/material-issue/material-issue.component';
import { MaterialQuotationComponent } from './modules/feature/material-quotation/material-quotation.component';
import { MaterialSupplierAdvanceComponent } from './modules/feature/material-supplier-advance/material-supplier-advance.component';
import { MaterialSupplierPaymentComponent } from './modules/feature/material-supplier-payment/material-supplier-payment.component';
import { MaterialTransferRequestComponent } from './modules/feature/material-transfer-request/material-transfer-request.component';
import { MaterialReceivedComponent } from './modules/feature/material-received/material-received.component';
import { MaterialReceivedEditComponent } from './modules/feature/material-received/edit/material-received-edit.component';
import { MaterialPurchaseReturnComponent } from './modules/feature/material-purchase-return/material-purchase-return.component';
import { MaterialPurchaseOrderComponent } from './modules/feature/material-purchase-order/material-purchase-order.component';
import { MaterialPurchaseOrderEditComponent } from './modules/feature/material-purchase-order/edit/material-purchase-order-edit.component';
import { AccountHeadRegistrationComponent } from './modules/feature/account-head-registration/account-head-registration.component';
import { AccountHeadRegistrationEditComponent } from './modules/feature/account-head-registration/edit/account-head-registration-edit.component';
import { BankAccountRegistrationComponent } from './modules/feature/bank-account-registration/bank-account-registration.component';
import { BankAccountRegistrationEditComponent } from './modules/feature/bank-account-registration/edit/bank-account-registration-edit.component';
import { JournalVoucherEntryComponent } from './modules/feature/journal-voucher-entry/journal-voucher-entry.component';
import { JournalVoucherEntryEditComponent } from './modules/feature/journal-voucher-entry/edit/journal-voucher-entry-edit.component';
import { DocumentGroupComponent } from './modules/feature/document-group/document-group.component';
import { BasicWorkCategoryComponent } from './modules/feature/work-category/basic-work-category.component';
import { BasicDocumentTypeComponent } from './modules/feature/document-type/basic-document-type.component';
import { BasicDocumentUploadComponent } from './modules/feature/document-upload/basic-document-upload.component';
import { BasicDocumentUploadEditComponent } from './modules/feature/document-upload/edit/basic-document-upload-edit.component';
import { BasicSitemanagerTransactionComponent } from './modules/feature/sitemanager-transaction/basic-sitemanager-transaction.component';
import { BasicSitemanagerTransactionEditComponent } from './modules/feature/sitemanager-transaction/edit/basic-sitemanager-transaction-edit.component';
import { BasicFinancialYearRegistrationComponent } from './modules/feature/financial-year/basic-financial-year-registration.component';
import { BasicChequeClearenceComponent } from './modules/feature/cheque-clearence/basic-cheque-clearence.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'company', pathMatch: 'full' },
      { path: 'company', component: CompanyComponent },
      { path: 'enquiry', component: ProjectEnquiryComponent },
      { path: 'enquirymode', component: EnquiryModeComponent },
      { path: 'enquirystatus', component: EnquiryStatusComponent },
      { path: 'enquiryfor', component: EnquiryForComponent },
      { path: 'approvelevel', component: ApproveLevelComponent },
      { path: 'user', component: UserComponent },
      { path: 'usergroup', component: UserGroupComponent },
      { path: 'followup', component: FollowUpComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'projectbooking', component: ProjectBookingComponent },
      { path: 'materialregistration', component: MaterialRegistrationComponent },
      { path: 'supplierregistration', component: SupplierRegistrationComponent },
      { path: 'employeedesignation', component: EmployeeDesignationRegistrationComponent },
      { path: 'workinghourssetting', component: WorkingHoursSettingComponent },
      { path: 'labourworkratesetting', component: LabourWorkrateSettingComponent },
      { path: 'employeeregistration', component: EmployeeRegistrationComponent },
      { path: 'foremanworkorder', component: ForemanWorkOrderComponent },
      { path: 'holidaySetting', component: HolidaySettingComponent },
      { path: 'salaryHeadCreation', component: SalaryHeadCreationComponent },
      { path: 'leaveSetting', component: LeaveSettingComponent },
      { path: 'unitregistration', component: UnitRegistrationComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'floor', component: ProjectFloorRegistrationComponent },
      { path: 'block', component: ProjectBlockRegistrationComponent },
      { path: 'assignblockfloors', component: AssignBlockFloorComponent },
      { path: 'team', component: TeamComponent },
      { path: 'consultancywork', component: ConsultancyWorkComponent },
      { path: 'materialindentcreation', component: MaterialIndentCreationComponent },
      { path: 'materialindentapproval', component: MaterialIndentApprovalComponent },
      { path: 'materialdamagestock', component: DamageStockEntryComponent },
      { path: 'materialbrandregistration', component: MaterialBrandRegistrationComponent },
      { path: 'materialcategoryregistration', component: MaterialCategoryRegistrationComponent },
      { path: 'materialusage', component: MaterialIssueComponent },
      { path: 'materialquotation', component: MaterialQuotationComponent },
      { path: 'materialsupplieradvance', component: MaterialSupplierAdvanceComponent },
      { path: 'materialsupplierpayment', component: MaterialSupplierPaymentComponent },
      { path: 'materialtransferrequest', component: MaterialTransferRequestComponent },
      { path: 'materialreceived', component: MaterialReceivedComponent },
      { path: 'addmaterialreceived', component: MaterialReceivedEditComponent },
      { path: 'materialpurchasereturn', component: MaterialPurchaseReturnComponent },
      { path: 'materialpurchaseorder', component: MaterialPurchaseOrderComponent },
      { path: 'addmaterialpurchaseorder', component: MaterialPurchaseOrderEditComponent },
      { path: 'accountheadregistration', component: AccountHeadRegistrationComponent },
      { path: 'addaccounthead', component: AccountHeadRegistrationEditComponent },
      { path: 'bankaccountregistration', component: BankAccountRegistrationComponent },
      { path: 'addbankaccount', component: BankAccountRegistrationEditComponent },
      { path: 'journal', component: JournalVoucherEntryComponent },
      { path: 'addjournal', component: JournalVoucherEntryEditComponent },
      { path: 'documentgroup', component: DocumentGroupComponent },
      { path: 'workcategory', component: BasicWorkCategoryComponent },
      { path: 'documenttype', component: BasicDocumentTypeComponent },
      { path: 'documentupload', component: BasicDocumentUploadComponent },
      { path: 'adddocument', component: BasicDocumentUploadEditComponent },
      { path: 'sitemanagertransaction', component: BasicSitemanagerTransactionComponent },
      { path: 'addsitemanagertransaction', component: BasicSitemanagerTransactionEditComponent },
      { path: 'financialyear', component: BasicFinancialYearRegistrationComponent },
      { path: 'chequeclearence', component: BasicChequeClearenceComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
