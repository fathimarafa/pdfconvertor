import { AccountHeadRegistrationComponent } from "./components/account-head-registration/account-head-registration.component";
import { AccountHeadRegistrationEditComponent } from "./components/account-head-registration/edit/account-head-registration-edit.component";
import { BankAccountRegistrationComponent } from "./components/bank-account-registration/bank-account-registration.component";
import { BankAccountRegistrationEditComponent } from "./components/bank-account-registration/edit/bank-account-registration-edit.component";
import { BasicChequeClearenceComponent } from "./components/cheque-clearence/basic-cheque-clearence.component";
import { DocumentGroupComponent } from "./components/document-group/document-group.component";
import { BasicDocumentTypeComponent } from "./components/document-type/basic-document-type.component";
import { BasicDocumentUploadComponent } from "./components/document-upload/basic-document-upload.component";
import { BasicDocumentUploadEditComponent } from "./components/document-upload/edit/basic-document-upload-edit.component";
import { BasicFinancialYearRegistrationComponent } from "./components/financial-year/basic-financial-year-registration.component";
import { JournalVoucherEntryApprovalComponent } from "./components/journal-voucher-entry-approval/journal-voucher-entry-approval.component";
import { JournalVoucherEntryEditComponent } from "./components/journal-voucher-entry/edit/journal-voucher-entry-edit.component";
import { JournalVoucherEntryComponent } from "./components/journal-voucher-entry/journal-voucher-entry.component";
import { BasicSitemanagerTransactionComponent } from "./components/sitemanager-transaction/basic-sitemanager-transaction.component";
import { BasicSitemanagerTransactionEditComponent } from "./components/sitemanager-transaction/edit/basic-sitemanager-transaction-edit.component";
import { BasicWorkCategoryComponent } from "./components/work-category/basic-work-category.component";

export const BasicModuleRoutes = [
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
    { path: 'chequeclearence', component: BasicChequeClearenceComponent },
    { path: 'journalapproval', component: JournalVoucherEntryApprovalComponent }
] 