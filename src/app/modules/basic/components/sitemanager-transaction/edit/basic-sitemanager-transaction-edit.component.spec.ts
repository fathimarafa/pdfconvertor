import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSitemanagerTransactionEditComponent } from './basic-sitemanager-transaction-edit.component';

describe('BasicSitemanagerTransactionEditComponent', () => {
  let component: BasicSitemanagerTransactionEditComponent;
  let fixture: ComponentFixture<BasicSitemanagerTransactionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicSitemanagerTransactionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSitemanagerTransactionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
