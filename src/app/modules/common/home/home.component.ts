import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuSearchShortcutComponent } from '../menu-search-shortcut/menu-search-shortcut.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  keydownCallback;
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.listenMenuSearchEvent();
  }

  onLogoutBtnClick() {
    this.router.navigate(['/login']);
  }

  listenMenuSearchEvent() {
    this.keydownCallback = (event) => {
      if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        this.dialog.open(MenuSearchShortcutComponent);
      }
    };
    document.addEventListener('keydown', this.keydownCallback, false);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.keydownCallback);
  }

  onClickBrandLogo(): void {
    this.router.navigateByUrl('/home/dashboard');
  }
}
