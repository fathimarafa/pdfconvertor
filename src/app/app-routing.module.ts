import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/common/login/login.component';
import { HomeComponent } from './modules/common/home/home.component';
import { HRmoduleRoutes } from './modules/hr/hr.route';
import { MaterialModuleRoutes } from './modules/material/material.route';
import { BasicModuleRoutes } from './modules/basic/basic.route';
import { CRMmoduleRoutes } from './modules/crm/crm.route';
import { PrebudgetModuleRoutes } from './modules/prebudget/prebudget.route';
import { DashboardRoutes } from './modules/dashboard/dashboard.route';
import { PaymentReceiptModuleRoutes } from './modules/payment-receipt/payment-receipt.route';
import { RouteAuthGuardService, ChildRouteAuthGuardService } from './services/route-guard/route-auth-guard.service';
import { ReportsModuleRoutes } from './modules/reports/reports.route';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    canActivate: [RouteAuthGuardService],
    canActivateChild: [ChildRouteAuthGuardService],
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      ...CRMmoduleRoutes,
      ...BasicModuleRoutes,
      ...MaterialModuleRoutes,
      ...HRmoduleRoutes,
      ...PrebudgetModuleRoutes,
      ...DashboardRoutes,
      ...PaymentReceiptModuleRoutes,
      ...ReportsModuleRoutes,
    ],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
