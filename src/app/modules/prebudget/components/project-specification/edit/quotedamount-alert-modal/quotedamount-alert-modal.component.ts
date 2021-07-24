import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quotedamount-alert-modal',
  templateUrl: './quotedamount-alert-modal.component.html',
  styleUrls: ['./quotedamount-alert-modal.component.css']
})
export class QuotedamountAlertModalComponent implements OnInit {

  dataSource;
  dataColumns;

  constructor(
    public dialogRef: MatDialogRef<QuotedamountAlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.defineModel();
  }

  onConfirmBtnClick() {
    const isConfirmed = true;
    this.dialogRef.close(isConfirmed);
  }

  onCancelBtnClick() {
    const isConfirmed = false;
    this.dialogRef.close(isConfirmed);
  }

  defineModel() {
    this.dataSource = [
      { name: 'Contractor Profit', value: this.data.contractorProfitAmt },
      { name: 'Other Expense', value: this.data.other_expense },
      { name: 'Maximum Discount', value: this.profit },
      { name: 'Quoted Rate', value: this.data.ratePerUnit },
      { name: 'Current Quoted Rate', value: this.data.quotedRatePerUnit },
      { name: 'Current Discount', value: this.discount },
      { name: 'Current Loss', value: this.loss }
    ]
    this.dataColumns = Object.keys(this.dataSource[0]);
  }

  private get loss() {
    return this.discount - this.profit;
  }

  private get profit() {
    return this.data.contractorProfitAmt + this.data.other_expense;
  }

  private get discount() {
    return this.data.ratePerUnit - this.data.quotedRatePerUnit
  }


}