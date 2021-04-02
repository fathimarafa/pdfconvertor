import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalVoucherEntryEditComponent } from './journal-voucher-entry-edit.component';

describe('JournalVoucherEntryEditComponent', () => {
  let component: JournalVoucherEntryEditComponent;
  let fixture: ComponentFixture<JournalVoucherEntryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalVoucherEntryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalVoucherEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
