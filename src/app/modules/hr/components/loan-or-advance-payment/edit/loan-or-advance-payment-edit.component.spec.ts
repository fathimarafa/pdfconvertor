import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanOrAdvancePaymentEditComponent } from './loan-or-advance-payment-edit.component';

describe('LoanOrAdvancePaymentEditComponent', () => {
  let component: LoanOrAdvancePaymentEditComponent;
  let fixture: ComponentFixture<LoanOrAdvancePaymentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanOrAdvancePaymentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanOrAdvancePaymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
