import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanOrAdvancePaymentComponent } from './loan-or-advance-payment.component';

describe('LoanOrAdvancePaymentComponent', () => {
  let component: LoanOrAdvancePaymentComponent;
  let fixture: ComponentFixture<LoanOrAdvancePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanOrAdvancePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanOrAdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
