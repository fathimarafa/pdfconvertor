import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from '../../../services/datahandler/datahandler.service';
import { DialogActions, IDialogEvent, IDeleteDialogInput } from '../../../definitions/dialog.definitions';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteDialogInput,
    private dataHandler: DataHandlerService
  ) { }

  ngOnInit(): void { }

  onConfirmBtnClick() {
    this.dataHandler.delete(this.data.endPoint).subscribe((res) => {
      const closeEvent: IDialogEvent = {
        action: DialogActions.delete,
        data: this.data
      }
      this.dialogRef.close(closeEvent);
    })
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }


}
