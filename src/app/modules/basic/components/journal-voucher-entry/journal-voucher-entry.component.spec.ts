import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalVoucherEntryComponent } from './journal-voucher-entry.component';

describe('JournalVoucherEntryComponent', () => {
  let component: JournalVoucherEntryComponent;
  let fixture: ComponentFixture<JournalVoucherEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalVoucherEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalVoucherEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
