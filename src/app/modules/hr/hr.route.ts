import { AddLabourToProjectComponent } from './components/add-labour-to-project/add-labour-to-project.component';
import { AttendanceEntryComponent } from './components/attendance-entry/attendance-entry.component';
import { ContractorPaymentComponent } from './components/contractor-payment/contractor-payment.component';
import { ContractorWorkOrderComponent } from './components/contractor-work-order/contractor-work-order.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeDesignationRegistrationComponent } from './components/employee-designation-registration/employee-designation-registration.component';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { ForemanPaymentComponent } from './components/foreman-payment/foreman-payment.component';
import { ForemanWorkBillComponent } from './components/foreman-work-bill/foreman-work-bill.component';
import { ForemanWorkOrderComponent } from './components/foreman-work-order/foreman-work-order.component';
import { GroupLabourWagePaymentComponent } from './components/group-labour-wage-payment/group-labour-wage-payment.component';
import { HolidaySettingComponent } from './components/holiday-setting/holiday-setting.component';
import { LabourWagePaymentComponent } from './components/labour-wage-payment/labour-wage-payment.component';
import { LabourWorkrateSettingComponent } from './components/labour-workrate-setting/labour-workrate-setting.component';
import { LeaveSettingComponent } from './components/leave-setting/leave-setting.component';
import { SalaryHeadCreationComponent } from './components/salary-head-creation/salary-head-creation.component';
import { SubcontractorIndentComponent } from './components/subcontractor-indent/subcontractor-indent.component';
import { SubcontractorlabourgroupattendanceComponent } from './components/subcontractor-labour-groupattendancesetting/subcontractor-labour-groupattendancesetting.component';
import { SubcontractorlabourgroupComponent } from './components/subcontractor-labour-groupsetting/subcontractor-labour-groupsetting.component';
import { SubcontractorattendanceApprovalComponent } from './components/subcontractor-labourgroupattendance-approval/subcontractor-labourgroupattendance-approval.component';
import { SubcontractorWorkBillApprovalComponent } from './components/subcontractor-work-bill-approval/subcontractor-work-bill-approval.component';
import { SubcontractorWorkBillComponent } from './components/subcontractor-work-bill/subcontractor-work-bill.component';
import { SubcontractorWorkOrderComponent } from './components/subcontractor-work-order/subcontractor-work-order.component';
import { SubcontractorbillPaymentComponent } from './components/subcontractorbillpayment/subcontractorbillpayment.component';
import { SubContractorIndentApprovalnewComponent } from './components/subcontractorindent-approval-new/subcontractorindent-approval-new.component';
import { WorkOrderApprovalComponent } from './components/work-order-approval/work-order-approval.component';
import { WorkingHoursSettingComponent } from './components/working-hours-setting/working-hours-setting.component';
import { LoanOrAdvancePaymentComponent } from './components/loan-or-advance-payment/loan-or-advance-payment.component';
import { LabourBulkAttendanceEntryComponent } from './components/labour-bulk-attendance-entry/labour-bulk-attendance-entry.component';
import { LabourBulkAttendanceEntryApprovalComponent } from './components/labour-bulk-attendance-entry-approval/labour-bulk-attendance-entry-approval.component';
import { SubcontractorAttendanceBulkApprovalComponent } from './components/subcontractor-attendance-bulk-approval/subcontractor-attendance-bulk-approval.component';
import { SubcontractorPaymentApprovalComponent } from './components/subcontractor-payment-approval/subcontractor-payment-approval.component';
import { LabourAttendanceEntryComponent } from './components/labour-attendance-entry/labour-attendance-entry.component';
import { ContractorWorkOrderApprovalComponent } from './components/contractor-work-order-approval/contractor-work-order-approval.component';
import { ContractorPaymentApprovalComponent } from './components/contractor-payment-approval/contractor-payment-approval.component';
import { LabourAttendanceEntryApprovalComponent } from './components/labour-attendance-entry-approval/labour-attendance-entry-approval.component';
import { ForemanPaymentApprovalComponent } from './components/foreman-payment-approval/foreman-payment-approval.component';
import { ForemanWorkBillApprovalComponent } from './components/foreman-work-bill-approval/foreman-work-bill-approval.component';
import { LabourWagePaymentApprovalComponent } from './components/labour-wage-payment-approval/labour-wage-payment-approval.component';
import { GroupLabourWagePaymentApprovalComponent } from './components/group-labour-wage-payment-approval/group-labour-wage-payment-approval.component';

export const HRmoduleRoutes = [
  {
    path: 'employeedesignation',
    component: EmployeeDesignationRegistrationComponent,
  },
  { path: 'workinghourssetting', component: WorkingHoursSettingComponent },
  { path: 'labourworkratesetting', component: LabourWorkrateSettingComponent },
  { path: 'employeeregistration', component: EmployeeRegistrationComponent },
  { path: 'foremanworkorder', component: ForemanWorkOrderComponent },
  { path: 'holidaySetting', component: HolidaySettingComponent },
  { path: 'salaryHeadCreation', component: SalaryHeadCreationComponent },
  { path: 'leaveSetting', component: LeaveSettingComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'addlabourtoproject', component: AddLabourToProjectComponent },
  { path: 'attendanceentry', component: AttendanceEntryComponent },
  { path: 'contractorpayment', component: ContractorPaymentComponent },
  { path: 'contractorworkorder', component: ContractorWorkOrderComponent },
  { path: 'foremanpayment', component: ForemanPaymentComponent },
  { path: 'foremanworkbill', component: ForemanWorkBillComponent },
  {
    path: 'grouplabourwagepayment',
    component: GroupLabourWagePaymentComponent,
  },
  { path: 'labourwagepayment', component: LabourWagePaymentComponent },
  { path: 'subcontractorindent', component: SubcontractorIndentComponent },
  {
    path: 'subcontractorgroupattendance',
    component: SubcontractorlabourgroupattendanceComponent,
  },
  {
    path: 'subcontractorlabourgroup',
    component: SubcontractorlabourgroupComponent,
  },
  {
    path: 'subcontractorworkorder',
    component: SubcontractorWorkOrderComponent,
  },
  { path: 'subcontractorworkbill', component: SubcontractorWorkBillComponent },
  {
    path: 'subcontractorlabourgroupsetting',
    component: SubcontractorlabourgroupComponent,
  },
  {
    path: 'subcontractorbillpayment',
    component: SubcontractorbillPaymentComponent,
  },
  {
    path: 'subcontractorlabourgroupattendanceapproval',
    component: SubcontractorattendanceApprovalComponent,
  },
  {
    path: 'subcontractorindentapproval',
    component: SubContractorIndentApprovalnewComponent,
  },
  {
    path: 'suncontractorworkorderapproval',
    component: WorkOrderApprovalComponent,
  },
  {
    path: 'subcontractorworkbillapproval',
    component: SubcontractorWorkBillApprovalComponent,
  },
  {
    path: 'loanAdvancePayment',
    component: LoanOrAdvancePaymentComponent,
  },
  { path: 'labourbulkattendanceentry', component: LabourBulkAttendanceEntryComponent },
  { path: 'labourbulkattendanceentryapproval', component: LabourBulkAttendanceEntryApprovalComponent },
  { path: 'subcontractorbulkattendanceapproval', component: SubcontractorAttendanceBulkApprovalComponent },
  { path: 'subcontractorpaymentapproval', component: SubcontractorPaymentApprovalComponent },
  { path: 'contractorworkorderapproval', component: ContractorWorkOrderApprovalComponent },
  { path: 'contractorpaymentapproval', component: ContractorPaymentApprovalComponent },
  
  { path: 'labourattendanceentry', component: LabourAttendanceEntryComponent }, 
  { path: 'labourattendanceentryapproval', component: LabourAttendanceEntryApprovalComponent },
  
  { path: 'foremanpaymentapproval', component: ForemanPaymentApprovalComponent },
  { path: 'foremanworkbillapproval', component: ForemanWorkBillApprovalComponent },
  { path: 'labourwagepaymentapproval', component: LabourWagePaymentApprovalComponent },
  { path: 'grouplabourwagepaymentapproval', component: GroupLabourWagePaymentApprovalComponent }
];
