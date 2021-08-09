import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorPaymentApprovalComponent } from './subcontractor-payment-approval.component';

describe('SubcontractorPaymentApprovalComponent', () => {
  let component: SubcontractorPaymentApprovalComponent;
  let fixture: ComponentFixture<SubcontractorPaymentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorPaymentApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorPaymentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
