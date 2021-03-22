import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavigationMenu } from './sidebar.configuration';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarNavBar;
  selectedNavItem: any = {};

  constructor(
    private router: Router
  ) {
    this.sidebarNavBar = SideNavigationMenu;
    this.bindInitialSelection();
  }

  ngOnInit(): void { }

  bindInitialSelection() {
    this.sidebarNavBar.forEach((l1) => {
      l1.subItem.forEach((l2) => {
        l2.subItem.forEach((l3) => {
          const pathArray = this.router.url.split('/');
          const endPath = pathArray[pathArray.length - 1];
          const navLinkArr = l3.navLink.split('/');
          const endLink = navLinkArr[navLinkArr.length - 1];
          if (endPath === endLink) {
            this.selectedNavItem = l3;
            this.selectedNavItem.isSelected = true;
          }
        });
      });
    });
  }

  onSelection(navItem) {
    this.selectedNavItem.isSelected = false;
    this.selectedNavItem = navItem;
    this.selectedNavItem.isSelected = true;
  }

}