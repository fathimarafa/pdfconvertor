import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanPaymentApprovalComponent } from './foreman-payment-approval.component';

describe('ForemanPaymentApprovalComponent', () => {
  let component: ForemanPaymentApprovalComponent;
  let fixture: ComponentFixture<ForemanPaymentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForemanPaymentApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForemanPaymentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
