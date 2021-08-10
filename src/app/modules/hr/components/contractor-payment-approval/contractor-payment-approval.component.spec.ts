import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPaymentApprovalComponent } from './contractor-payment-approval.component';

describe('ContractorPaymentApprovalComponent', () => {
  let component: ContractorPaymentApprovalComponent;
  let fixture: ComponentFixture<ContractorPaymentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorPaymentApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorPaymentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
