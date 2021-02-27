import { Component, OnInit } from '@angular/core';
import { SideNavigationMenu } from './sidebar.configuration';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarNavBar;

  constructor() {
    this.sidebarNavBar = SideNavigationMenu;
  }

  ngOnInit(): void { }

}