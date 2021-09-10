import { ReportConfigurationComponent } from './components/report-configuration/report-configuration.component';
import { EnquiryReportComponent } from './components/enquiry-report/enquiry-report.component';

export const ReportsModuleRoutes = [
    { path: 'reportconfiguration', component: ReportConfigurationComponent },
    { path: 'enquiryreport', component: EnquiryReportComponent }
]