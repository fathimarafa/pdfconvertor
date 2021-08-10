import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourWagePaymentApprovalComponent } from './labour-wage-payment-approval.component';

describe('LabourWagePaymentApprovalComponent', () => {
  let component: LabourWagePaymentApprovalComponent;
  let fixture: ComponentFixture<LabourWagePaymentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourWagePaymentApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourWagePaymentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
