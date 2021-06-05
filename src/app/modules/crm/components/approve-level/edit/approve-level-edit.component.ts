import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { FormLevelSettingMetadata } from '../../form-level-setting/form-level-setting.configuration';
import { Team } from '../../team/definitions/team.definitions';
import { TeamMetadata } from '../../team/team.configuration';
import { User } from '../../user/definitions/user.definition';
import { UserMetadata } from '../../user/user.configuration';
import { ApproveLevelMetadata } from '../approve-level.configuration';
import { ApproveLevel } from '../definitions/approvelevel.definition';

@Component({
  selector: 'app-approve-level-edit',
  templateUrl: './approve-level-edit.component.html',
  styleUrls: ['./approve-level-edit.component.css']
})
export class ApproveLevelEditComponent implements OnInit {

  tableColumns;
  dataSource;
  userList: User[];
  teamList: Team[];
  approvalForms;

  selectedForm;
  selectedTeam: Team;

  teamUserList;

  isEdit: boolean;

  model;

  constructor(
    private dialogRef: MatDialogRef<ApproveLevelEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.model = this.editData || {};
    this.userList = [];
    this.defineTable();
    this.loadDropdowns();
  }

  defineTable() {
    this.tableColumns = ApproveLevelMetadata.levelTableColumns;
    let tableRows;
    if (this.isEdit) {
      let levelUsers: any = {}
      this.model.user.forEach((e) => {
        if (!levelUsers[e.formlevel]) {
          levelUsers[e.formlevel] = {
            formlevel: e.formlevel,
            userId: []
          }
        }
        levelUsers[e.formlevel].userId.push(e.userId);
      });
      tableRows = Object.values(levelUsers);
    } else {
      tableRows = [{ formlevel: 1, userId: [] }];
    }
    console.log(tableRows);
    this.dataSource = new MatTableDataSource(tableRows);
  }

  ngOnInit() { }

  onTeamSelection() {
    let teamUsersId = this.teamList.find(e => e.id === this.model.teamId).teamDetails.map(e => e.userId);
    this.teamUserList = this.userList.filter(e => teamUsersId.includes(e.id))
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  loadDropdowns() {
    this.fetchUsers();
    this.fetchTeam();
    this.fetchApprovalMenu();
  }

  fetchUsers() {
    this.dataHandler.get<User[]>(UserMetadata.serviceEndPoint).subscribe((res: User[]) => {
      this.userList = res;
      this.teamUserList = res;
    })
  }

  fetchTeam() {
    this.dataHandler.get<Team[]>(TeamMetadata.serviceEndPoint).subscribe((res: Team[]) => {
      this.teamList = res;
    });
  }

  fetchApprovalMenu() {
    this.dataHandler.get(FormLevelSettingMetadata.serviceEndPoint.getMenuWithApproval).subscribe((res: any[]) => {
      this.approvalForms = res;
    });
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }


  onSaveBtnClick() {
    if (this.isFormValid) {
      this.httpRequest.subscribe((res) => {
        let data = {
          menuId: this.model.menuId,
          teamId: this.model.teamId,
          user: []
        }
        this.dataSource.data.forEach((row) => {
          row.userId.forEach((id) => {
            data.user.push({ userId: id, formlevel: row.formlevel })
          });
        });
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  get isFormValid() {
    let valid = true;
    if (!this.model.menuId) {
      this.snackBar.open('Invalid : Please select form');
      valid = false;
    }
    if (this.dataSource.data[0].userId.length < 1) {
      this.snackBar.open('Invalid : Please select users');
      valid = false;
    }
    return valid;
  }

  get httpRequest(): Observable<ApproveLevel> {
    if (this.isEdit) {
      return this.dataHandler.put<ApproveLevel>(ApproveLevelMetadata.serviceEndPoint, this.payload);
    } else {
      return this.dataHandler.post<ApproveLevel>(ApproveLevelMetadata.serviceEndPoint, this.payload);
    }
  }

  get payload(): ApproveLevel[] {
    let data = [];
    let user = this.authService.loggedInUser;
    this.dataSource.data.forEach((row, index) => {
      if (Array.isArray(row.userId)) {
        row.userId.forEach(e => {
          data.push({
            userid: e,
            menuId: this.model.menuId,
            formlevel: index + 1,
            teamId: this.model.teamId || 0,
            companyId: user.companyId,
            branchId: user.branchId,
            entryUserId: user.userId
          })
        });
      }
    });
    return data;
  }

  onAddNewLevelBtnClick() {
    const newLevel = { formlevel: this.dataSource.data.length + 1, userId: [] };
    this.dataSource.data.push(newLevel);
    this.dataSource._updateChangeSubscription();
  }

  onRemoveBtnClick(rowToRemove) {
    if (this.dataSource.data.length === 1) {
      this.snackBar.open('Warning : Atleast one level needed');
      return;
    }
    this.dataSource.data.splice(rowToRemove, 1)
    this.dataSource._updateChangeSubscription();
  }

}