import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { DialogEventHandlerService } from '../../../../services/dialog-event-handler/dialogeventhandler.service';
import { UserPrevilegeMetadata } from './user-previlege.configuration';
import { UserPrevilege } from './definitions/user-previlege.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { SideNavbarMetadata } from 'src/app/modules/common/sidebar/sidebar.configuration';
import { SidebarMenu } from 'src/app/modules/common/sidebar/definitions/sidebar.definition';

@Component({
  selector: 'app-user-previlege',
  templateUrl: './user-previlege.component.html',
  styleUrls: ['./user-previlege.component.css']
})
export class UserPrevilegeComponent implements OnInit {

  module;
  tableColumns;
  dataSource;
  menuTree;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private dialogEventHandler: DialogEventHandlerService,
    private authService: AuthenticationService
  ) {
    this.module = UserPrevilegeMetadata;

    this.fetchMenu()

  }

  onMenuSelection(mainMenu, childMenu?, grandchildMenu?) {
    if (mainMenu && !childMenu && !grandchildMenu) {
      mainMenu.isSelected = !mainMenu.isSelected;
      if (mainMenu.subItem) {
        mainMenu.subItem.forEach(e => {
          e.iSelected = mainMenu.isSelected;
          if (e.subItem) {
            e.subItem.forEach(child => {
              child.iSelected = mainMenu.isSelected;
            });
          }
        });
      }
    }
    if (mainMenu && childMenu && !grandchildMenu) {
      childMenu.isSelected = !childMenu.isSelected;
      mainMenu.isSelected = childMenu.isSelected;
      if (childMenu.subItem) {
        childMenu.subItem.forEach(e => {
          e.iSelected = childMenu.isSelected;
        });
      }

    }
    if (mainMenu && childMenu && grandchildMenu) {
      grandchildMenu.isSelected = !grandchildMenu.isSelected;
      mainMenu.isSelected = grandchildMenu.isSelected;
      childMenu.isSelected = grandchildMenu.isSelected;
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit() { }

  fetchModuleSettings() {
    this.dataHandler.get(this.module.serviceEndPoint)
      .subscribe((res: any[]) => {

      });
  }

  onEditBtnClick(rowToEdit?) {
    // this.dialogEventHandler.openDialog(
    //   FormLevelSettingEditComponent,
    //   this.dataSource,
    //   this.dataSource.data,
    //   this.affectedRowIndex(rowToEdit)
    // )
  }

  fetchMenu() {
    const endpoint = `${SideNavbarMetadata.serviceEndPoint}/${this.authService.loggedInUser.userId}`;
    this.dataHandler.get(SideNavbarMetadata.serviceEndPoint).subscribe((menuList: SidebarMenu[]) => {
      this.menuTree = this.generateSidemenuTree(menuList);
      this.hasChildren();
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

  hasChildren() {
    // for (let l1 of this.menuTree) {
    //   if (l1.subItem && l1.subItem.length) {
    //     for (let l2 of l1.subItem) {
    //       if (l2.subItem && l2.subItem.length) {
    //         l1.displayBlock = true;
    //         break;
    //       }
    //     }
    //   }
    // }
  }

}