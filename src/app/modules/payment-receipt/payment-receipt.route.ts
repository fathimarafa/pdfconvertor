import { BillReceiptsApprovalComponent } from './components/bill-receipts-approval/bill-receipts-approval.component';
import { BillReceiptsComponent } from './components/bill-receipts/bill-receipts.component';
import { ClientAdvanceApprovalComponent } from './components/client-advance-approval/client-advance-approval.component';
import { ClientAdvanceComponent } from './components/client-advance/client-advance.component';
import { PartBillComponent } from './components/part-bill/part-bill.component';
import { RefundingComponent } from './components/refunding/refunding.component';
import { SitemanagerTransactionApprovalComponent } from './components/sitemanager-transaction-approval/sitemanager-transaction-approval.component';

export const PaymentReceiptModuleRoutes = [
    { path: 'clientadvance', component: ClientAdvanceComponent },
    { path: 'clientadvanceapproval', component: ClientAdvanceApprovalComponent },
    { path: 'partbill', component: PartBillComponent },
    { path: 'refund', component: RefundingComponent },
    { path: 'billreceipt', component: BillReceiptsComponent },
    { path: 'billreceiptapproval', component: BillReceiptsApprovalComponent },
    { path: 'sitemanagertransactionapproval', component: SitemanagerTransactionApprovalComponent }
]