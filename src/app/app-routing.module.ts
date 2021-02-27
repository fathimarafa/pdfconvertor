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
      { path: 'unitRegistration', component: UnitRegistrationComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'floor', component: ProjectFloorRegistrationComponent },
      { path: 'block', component: ProjectBlockRegistrationComponent },
      { path: 'assignblockfloors', component: AssignBlockFloorComponent },
      { path: 'team', component: TeamComponent },
      { path: 'consultancywork', component: ConsultancyWorkComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
