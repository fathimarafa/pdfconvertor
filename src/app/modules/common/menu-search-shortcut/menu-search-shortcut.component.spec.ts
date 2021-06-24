import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSearchShortcutComponent } from './menu-search-shortcut.component';

describe('MenuSearchShortcutComponent', () => {
  let component: MenuSearchShortcutComponent;
  let fixture: ComponentFixture<MenuSearchShortcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSearchShortcutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSearchShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
