import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { User } from '../../user/definitions/user.definition';
import { UserMetadata } from '../../user/user.configuration';

@Component({
  selector: 'app-approve-level-edit',
  templateUrl: './approve-level-edit.component.html',
  styleUrls: ['./approve-level-edit.component.css']
})
export class ApproveLevelEditComponent implements OnInit {


  tableColumns;
  dataSource;
  userList: User[];

  constructor(
    private dialogRef: MatDialogRef<ApproveLevelEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataHandler: DataHandlerService,
  ) {
    // console.log('modal', data);
    this.userList = [];
    this.tableColumns = displayColumns;
    this.dataSource = new MatTableDataSource(dummyData);
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  get dataColumns() {
    // return this.tableColumns;
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  fetchUsers() {
    this.dataHandler.get<User[]>(UserMetadata.serviceEndPoint).subscribe((res: User[]) => {
      this.userList = res;
    })
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  onSaveBtnClick() {

  }

  onAddNewLevelBtnClick() {
    const newLevel = { formlevel: this.dataSource.data.length, userId: 1 };
    this.dataSource.data.push(newLevel);
    this.dataSource._updateChangeSubscription();
  }

  onRemoveBtnClick(rowToRemove) {
    this.dataSource.data.splice(rowToRemove, 1)
    this.dataSource._updateChangeSubscription();
  }

}


const dummyData = [
  { formlevel: 1, userId: 1 },
  { formlevel: 2, userId: 2 },
  { formlevel: 3, userId: 3 },
];


const displayColumns = [
  {
    "field": 'formlevel',
    "displayName": 'Level'
  },
  {
    "field": 'userId',
    "displayName": 'User'
  },
  {
    "field": 'action',
    "displayName": ''
  }
]