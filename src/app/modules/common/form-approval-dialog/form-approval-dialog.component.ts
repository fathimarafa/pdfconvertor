import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-approval-dialog',
  templateUrl: './form-approval-dialog.component.html',
  styleUrls: ['./form-approval-dialog.component.css']
})
export class FormApprovalDialogComponent implements OnInit {

  comment;
  constructor(
    public dialogRef: MatDialogRef<FormApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.comment = data || '';
  }

  ngOnInit(): void { }

  onConfirmBtnClick() {
    this.dialogRef.close(this.comment);
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }


}
