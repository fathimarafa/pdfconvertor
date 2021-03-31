import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSitemanagerTransactionComponent } from './basic-sitemanager-transaction.component';

describe('BasicSitemanagerTransactionComponent', () => {
  let component: BasicSitemanagerTransactionComponent;
  let fixture: ComponentFixture<BasicSitemanagerTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicSitemanagerTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSitemanagerTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
