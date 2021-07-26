import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { SidebarMenu } from '../sidebar/definitions/sidebar.definition';
import { SideNavbarMetadata, SideNavigationMenu } from '../sidebar/sidebar.configuration';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-search-shortcut',
  templateUrl: './menu-search-shortcut.component.html',
  styleUrls: ['./menu-search-shortcut.component.css']
})
export class MenuSearchShortcutComponent implements OnInit {

  searchText: string;
  menuList: SidebarMenu[] = [];

  constructor(
    private router: Router,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<MenuSearchShortcutComponent>
  ) { }

  ngOnInit() {
    this.fetchMenu();
  }


  fetchMenu() {
    const endpoint = `${SideNavbarMetadata.serviceEndPoint}/${this.authService.loggedInUser.userId}`;
    this.dataHandler.get(endpoint).subscribe((menuList: SidebarMenu[]) => {
      this.menuList = menuList;
    })
  }

  get filteredMenu() {
    if (this.searchText) {
      return this.menuList.filter(e => e.menuName.toLowerCase().includes(this.searchText));
    }
    return this.menuList;
  }

  onSelection(menu: SidebarMenu) {
    const route = SideNavigationMenu[menu.menuId].route
    this.router.navigateByUrl(`/home${route}`);
    this.dialogRef.close();
  }

}
