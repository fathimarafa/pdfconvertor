export interface IDialogEvent {
    action: DialogActions;
    data: any;
}

export enum DialogActions {
    add,
    edit,
    delete,
    cancel
}


export interface IDeleteDialogInput {
    endPoint: string,
    deleteUid: string
}