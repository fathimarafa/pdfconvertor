import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemanagerTransactionApprovalComponent } from './sitemanager-transaction-approval.component';

describe('SitemanagerTransactionApprovalComponent', () => {
  let component: SitemanagerTransactionApprovalComponent;
  let fixture: ComponentFixture<SitemanagerTransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitemanagerTransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemanagerTransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
