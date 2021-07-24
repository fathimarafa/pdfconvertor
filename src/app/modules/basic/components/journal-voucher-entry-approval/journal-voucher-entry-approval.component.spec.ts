import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalVoucherEntryApprovalComponent } from './journal-voucher-entry-approval.component';

describe('JournalVoucherEntryApprovalComponent', () => {
  let component: JournalVoucherEntryApprovalComponent;
  let fixture: ComponentFixture<JournalVoucherEntryApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalVoucherEntryApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalVoucherEntryApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
