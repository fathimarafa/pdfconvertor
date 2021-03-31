import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicSitemanagerTransactionComponent } from './basic-sitemanager-transaction.component';
import { BasicSitemanagerTransactionEditComponent } from './edit/basic-sitemanager-transaction-edit.component';



@NgModule({
  declarations: [BasicSitemanagerTransactionComponent, BasicSitemanagerTransactionEditComponent],
  imports: [
    CommonModule
  ]
})
export class BasicSitemanagerTransactionModule { }
