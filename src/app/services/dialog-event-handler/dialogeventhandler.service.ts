import { IDialogEvent, DialogActions } from "../../definitions/dialog.definitions";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { IDialogEventHandlerService } from "./idialogeventhandler.service";

@Injectable()
export class DialogEventHandlerService implements IDialogEventHandlerService {

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    public openDialog(componentToLoad, dataSource, affectedRow?, affectedRowIndex?: number): void {
        const dialogReference = this.dialog.open(componentToLoad, { data: Object.assign({}, affectedRow) });
        dialogReference.afterClosed().subscribe((result: IDialogEvent) => {
            this.onActionComplete(result, dataSource, affectedRowIndex);
        });
    }

    private onActionComplete(result: IDialogEvent, dataSource, affectedRowIndex?: number): void {
        if (result && dataSource) {
            this.dialogCloseEventHandler(dataSource, result, affectedRowIndex);
        }
    }

    private dialogCloseEventHandler(dataSource, event: IDialogEvent, affectedRowIndex?: number): void {
        switch (event.action) {
            case DialogActions.add:
                dataSource.data.push(event.data);
                dataSource._updateChangeSubscription();
                this.snackBar.open('Data Saved Successfully');
                break;
            case DialogActions.edit:
                if (affectedRowIndex !== -1 && affectedRowIndex !== undefined) {
                    dataSource.data[affectedRowIndex] = event.data;
                    dataSource._updateChangeSubscription();
                    this.snackBar.open('Data Updated Successfully');
                }
                break;
            case DialogActions.delete:
                if (affectedRowIndex !== -1 && affectedRowIndex !== undefined) {
                    dataSource.data.splice(affectedRowIndex, 1)
                    dataSource._updateChangeSubscription();
                    this.snackBar.open('Data Removed Successfully');
                }
                break;
        }
    }

}