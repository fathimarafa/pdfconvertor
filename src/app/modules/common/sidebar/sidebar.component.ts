import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import {
  SideNavbarMetadata,
  SideNavigationMenu,
} from './sidebar.configuration';
import { SidebarMenu } from './definitions/sidebar.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebarNavBar;
  selectedNavItem: any = {};

  constructor(
    private router: Router,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService
  ) {
    this.fetchMenu();
  }

  fetchMenu() {
    const endpoint = `${SideNavbarMetadata.serviceEndPoint}/${this.authService.loggedInUser.userId}`;
    this.dataHandler.get(endpoint).subscribe((menuList: SidebarMenu[]) => {
      this.sidebarNavBar = this.generateSidemenuTree(menuList);
    });
  }

  ngOnInit(): void { }

  onSelection(navItem: SidebarMenu) {
    if (navItem.navLink.length < 1) {
      if (navItem.subItem && navItem.subItem.length) {
        navItem.showSubItem = !navItem.showSubItem;
      }
    } else {
      this.selectedNavItem.isSelected = false;
      this.selectedNavItem = navItem;
      this.selectedNavItem.isSelected = true;
      this.router.navigateByUrl(`/home${navItem.navLink}`);
    }
  }

  generateSidemenuTree(menuList: SidebarMenu[]): SidebarMenu[] {
    let rootMenuMapping = {};
    let rootLevelMapping = {};
    menuList.forEach((e: SidebarMenu) => {
      // console.log(`${e.menuId}: { menuId: ${e.menuId}, menuName: '${e.menuName}', route: '' },`)
      if (SideNavigationMenu[e.menuId]) {
        e.navLink = SideNavigationMenu[e.menuId].route;
      }
      this.bindInitialSelection(e);
      if (!rootMenuMapping[e.rootMenuId]) {
        rootMenuMapping[e.rootMenuId] = [];
      }
      rootMenuMapping[e.rootMenuId].push(e);
    });
    Object.keys(rootMenuMapping).forEach((e1) => {
      if (Number(e1)) {
        const menu: SidebarMenu = menuList.find(
          (e2) => e2.menuId === Number(e1)
        );
        if (!rootLevelMapping[menu.rootlevel]) {
          rootLevelMapping[menu.rootlevel] = [];
        }
        rootLevelMapping[menu.rootlevel].push(menu);
      }
    });
    const rootLevels: string[] = Object.keys(rootLevelMapping).sort((e) => -1);
    for (let i = 0; i < rootLevels.length; i++) {
      if (i === 0) {
        rootLevelMapping[rootLevels[i]].forEach((e1: SidebarMenu) => {
          e1.subItem = rootMenuMapping[e1.menuId];
          e1.showSubItem = false;
        });
      } else {
        rootLevelMapping[rootLevels[i]].forEach((e1: SidebarMenu) => {
          e1.subItem = rootLevelMapping[rootLevels[i - 1]].filter(
            (e2) => e2.rootMenuId === e1.menuId
          );
          if (e1.subItem.length < 1) {
            e1.subItem = rootMenuMapping[e1.menuId];
          }
          if (e1.menuId === 1000) {
            // show only master menus on load
            e1.showSubItem = true;
          }
        });
      }
    }
    return rootLevelMapping[Number(rootLevels[rootLevels.length - 1])];
  }

  bindInitialSelection(menu: SidebarMenu) {
    if (menu.navLink) {
      const pathArray = this.router.url.split('/');
      const endPath = pathArray[pathArray.length - 1];
      const navLinkArr = menu.navLink.split('/');
      const endLink = navLinkArr[navLinkArr.length - 1];
      if (endPath === endLink) {
        this.selectedNavItem = menu;
        this.selectedNavItem.isSelected = true;
      }
    }
  }
}
