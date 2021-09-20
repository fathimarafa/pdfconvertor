import { ReportConfigurationComponent } from './components/report-configuration/report-configuration.component';
import { EnquiryReportComponent } from './components/enquiry-report/enquiry-report.component';

export const ReportsModuleRoutes = [
    { path: 'reportconfiguration', component: ReportConfigurationComponent },
    { path: 'enquiryreport', component: EnquiryReportComponent },
    { path: 'enquiryfollowupreport', component: EnquiryReportComponent },
    { path: 'projectreport', component: EnquiryReportComponent },
    { path: 'projectbookingreport', component: EnquiryReportComponent },
    { path: 'stagewisepaymentreport', component: EnquiryReportComponent },
    { path: 'additionalbillreport', component: EnquiryReportComponent },
    { path: 'partbillreport', component: EnquiryReportComponent },
    { path: 'materiallist', component: EnquiryReportComponent },
    { path: 'supplierlist', component: EnquiryReportComponent },
    { path: 'indentreport', component: EnquiryReportComponent },
    { path: 'purchaseorderreport', component: EnquiryReportComponent },
    { path: 'employeelist', component: EnquiryReportComponent },
    { path: 'attendancereport', component: EnquiryReportComponent },
    { path: 'loanandadvancereport', component: EnquiryReportComponent },
    { path: 'salarybillreport', component: EnquiryReportComponent },
    { path: 'reportconfiguration', component: EnquiryReportComponent },
    { path: 'percentagewisebillreport', component: EnquiryReportComponent },
    { path: 'clientadvancereport', component: EnquiryReportComponent }
]