import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { SidebarMenu } from '../sidebar/definitions/sidebar.definition';
import { SideNavbarMetadata } from '../sidebar/sidebar.configuration';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-menu-search-shortcut',
  templateUrl: './menu-search-shortcut.component.html',
  styleUrls: ['./menu-search-shortcut.component.css']
})
export class MenuSearchShortcutComponent implements OnInit {
  myControl = new FormControl();
  options: SidebarMenu[] = [
    {
      "id": 1,
      "menuId": 1000,
      "menuName": "MASTER",
      "component": "",
      "rootlevel": 1,
      "rootMenuId": 0,
      "moduleId": 0,
      "haveApprovalLevel": 0,
      "isActive": 1
    },
    {
      "id": 2,
      "menuId": 2000,
      "menuName": "CRM",
      "component": "",
      "rootlevel": 1,
      "rootMenuId": 0,
      "moduleId": 0,
      "haveApprovalLevel": 0,
      "isActive": 1
    }
  ];
  filteredOptions: Observable<SidebarMenu[]>;

  constructor(
    private router: Router,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService
  ) {
    // this.fetchMenu();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          console.log('value', value)
          return typeof value === 'string' ? value : value.menuName
        }),
        map(name => {
          console.log('name', name);
          return name ? this._filter(name) : this.options.slice()
        })
      );
  }

  displayFn(menu: SidebarMenu): string {
    console.log('menu', menu);
    return menu && menu.menuName ? menu.menuName : '';
  }

  private _filter(name: string): SidebarMenu[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.menuName.toLowerCase().indexOf(filterValue) === 0);
  }


  fetchMenu() {
    const endpoint = `${SideNavbarMetadata.serviceEndPoint}/${this.authService.loggedInUser.userId}`;
    this.dataHandler.get(endpoint).subscribe((menuList: SidebarMenu[]) => {
      this.options = menuList;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => {
            console.log('value', value)
            return typeof value === 'string' ? value : value.menuName
          }),
          map(name => {
            console.log('name', name);
            return name ? this._filter(name) : this.options.slice()
          })
        );
    })
  }

}
