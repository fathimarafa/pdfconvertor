import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { UserPrevilegeMetadata } from './user-previlege.configuration';
import { UserPrevilege } from './definitions/user-previlege.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { SideNavbarMetadata } from 'src/app/modules/common/sidebar/sidebar.configuration';
import { SidebarMenu } from 'src/app/modules/common/sidebar/definitions/sidebar.definition';
import { UserGroup } from '../user-group/definitions/user-group.definition';
import { UserGroupMetadata } from '../user-group/user-group.configuration';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-previlege',
  templateUrl: './user-previlege.component.html',
  styleUrls: ['./user-previlege.component.css']
})
export class UserPrevilegeComponent implements OnInit {

  module;
  menuTree;
  userGroupList;
  selectedUserGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.module = UserPrevilegeMetadata;
    this.fetchMenu()
    this.fetchUserGroup();
  }

  onUserGroupSelection() {
    const user = this.authService.loggedInUser;
    const endpoint = `${this.module.serviceEndPoint}/${this.selectedUserGroup}/${user.companyId}/${user.branchId}`
    this.dataHandler.get<UserPrevilege[]>(endpoint).subscribe((res: UserPrevilege[]) => {
      const activeMenuId: number[] = res.map(e => e.menuId);
      this.menuTree.forEach((mainMenu) => {
        mainMenu.isSelected = activeMenuId.includes(mainMenu.menuId);
        if (mainMenu.subItem) {
          mainMenu.subItem.forEach((childMenu) => {
            childMenu.isSelected = activeMenuId.includes(childMenu.menuId);
            if (childMenu.subItem) {
              childMenu.subItem.forEach((grandchildMenu) => {
                grandchildMenu.isSelected = activeMenuId.includes(grandchildMenu.menuId);
              });
            }
          });
        }
      });
    })
  }

  onMenuSelection(event, mainMenu, childMenu?, grandchildMenu?) {
    event.preventDefault();
    if (mainMenu && !childMenu && !grandchildMenu) {
      mainMenu.isSelected = !mainMenu.isSelected;
      if (mainMenu.subItem) {
        mainMenu.subItem.forEach(e => {
          e.isSelected = mainMenu.isSelected;
          if (e.subItem) {
            e.subItem.forEach(child => {
              child.isSelected = mainMenu.isSelected;
            });
          }
        });
      }
    }
    if (mainMenu && childMenu && !grandchildMenu) {
      childMenu.isSelected = !childMenu.isSelected;
      if (childMenu.subItem) {
        childMenu.subItem.forEach(e => {
          e.isSelected = childMenu.isSelected;
        });
      }

    }
    if (mainMenu && childMenu && grandchildMenu) {
      grandchildMenu.isSelected = !grandchildMenu.isSelected;
    }
  }

  ngOnInit() { }


  fetchMenu() {
    const endpoint = `${SideNavbarMetadata.serviceEndPoint}/${this.authService.loggedInUser.userId}`;
    this.dataHandler.get(SideNavbarMetadata.serviceEndPoint).subscribe((menuList: SidebarMenu[]) => {
      this.menuTree = this.generateSidemenuTree(menuList);
      if (this.selectedUserGroup) {
        this.onUserGroupSelection();
      } else {
        setTimeout(() => {
          this.onUserGroupSelection();
        }, 2000);
      }
    })
  }

  generateSidemenuTree(menuList: SidebarMenu[]): SidebarMenu[] {
    let rootMenuMapping = {}; let rootLevelMapping = {};
    menuList.forEach((e: SidebarMenu) => {
      if (!rootMenuMapping[e.rootMenuId]) {
        rootMenuMapping[e.rootMenuId] = [];
      }
      rootMenuMapping[e.rootMenuId].push(e);
    })
    Object.keys(rootMenuMapping).forEach(e1 => {
      if (Number(e1)) {
        const menu: SidebarMenu = menuList.find(e2 => e2.menuId === Number(e1));
        if (!rootLevelMapping[menu.rootlevel]) {
          rootLevelMapping[menu.rootlevel] = [];
        }
        rootLevelMapping[menu.rootlevel].push(menu);
      }
    })
    const rootLevels: string[] = Object.keys(rootLevelMapping).sort(e => -1);
    for (let i = 0; i < rootLevels.length; i++) {
      if (i === 0) {
        rootLevelMapping[rootLevels[i]].forEach((e1: SidebarMenu) => {
          e1.subItem = rootMenuMapping[e1.menuId];
          e1.showSubItem = true;
        });
      } else {
        rootLevelMapping[rootLevels[i]].forEach((e1: SidebarMenu) => {
          e1.subItem = rootLevelMapping[rootLevels[i - 1]].filter(e2 => e2.rootMenuId === e1.menuId)
          if (e1.subItem.length < 1) {
            e1.subItem = rootMenuMapping[e1.menuId];
          }
          e1.showSubItem = true;
        });
      }
    }
    return rootLevelMapping[Number(rootLevels[rootLevels.length - 1])];
  }

  fetchUserGroup() {
    this.dataHandler.get<UserGroup[]>(UserGroupMetadata.serviceEndPoint)
      .subscribe((res: UserGroup[]) => {
        this.userGroupList = res;
        this.selectedUserGroup = res[0].userGroupId;
      });
  }

  onSaveBtnClick() {
    this.dataHandler.put<UserPrevilege[]>(this.module.serviceEndPoint, this.payload)
      .subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
      })
  }

  get payload() {
    let payload = [];
    let user = this.authService.loggedInUser;
    this.menuTree.forEach((mainMenu) => {
      this.addpayload(payload, mainMenu, user);
      if (mainMenu.subItem) {
        mainMenu.subItem.forEach((childMenu) => {
          this.addpayload(payload, childMenu, user)
          if (childMenu.subItem) {
            childMenu.subItem.forEach((grandchildMenu) => {
              this.addpayload(payload, grandchildMenu, user);
            });
          }
        });
      }
    });
    return payload;
  }

  private addpayload(payload, menu, user) {
    if (menu.isSelected) {
      payload.push({
        userGroupId: this.selectedUserGroup,
        menuId: menu.menuId,
        companyId: user.companyId,
        branchId: user.branchId
      });
    }
  }

}