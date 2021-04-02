import { AddLabourToProjectComponent } from './components/add-labour-to-project/add-labour-to-project.component';
import { AttendanceEntryComponent } from './components/attendance-entry/attendance-entry.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeDesignationRegistrationComponent } from './components/employee-designation-registration/employee-designation-registration.component';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { ForemanWorkOrderComponent } from './components/foreman-work-order/foreman-work-order.component';
import { HolidaySettingComponent } from './components/holiday-setting/holiday-setting.component';
import { LabourWorkrateSettingComponent } from './components/labour-workrate-setting/labour-workrate-setting.component';
import { LeaveSettingComponent } from './components/leave-setting/leave-setting.component';
import { SalaryHeadCreationComponent } from './components/salary-head-creation/salary-head-creation.component';
import { WorkingHoursSettingComponent } from './components/working-hours-setting/working-hours-setting.component';


export const HRmoduleRoutes = [
    { path: 'employeedesignation', component: EmployeeDesignationRegistrationComponent },
    { path: 'workinghourssetting', component: WorkingHoursSettingComponent },
    { path: 'labourworkratesetting', component: LabourWorkrateSettingComponent },
    { path: 'employeeregistration', component: EmployeeRegistrationComponent },
    { path: 'foremanworkorder', component: ForemanWorkOrderComponent },
    { path: 'holidaySetting', component: HolidaySettingComponent },
    { path: 'salaryHeadCreation', component: SalaryHeadCreationComponent },
    { path: 'leaveSetting', component: LeaveSettingComponent },
    { path: 'department', component: DepartmentComponent }
]