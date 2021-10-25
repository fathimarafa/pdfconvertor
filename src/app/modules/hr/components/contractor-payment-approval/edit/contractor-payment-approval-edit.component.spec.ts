import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPaymentApprovalEditComponent } from './contractor-payment-approval-edit.component';

describe('ContractorPaymentApprovalEditComponent', () => {
  let component: ContractorPaymentApprovalEditComponent;
  let fixture: ComponentFixture<ContractorPaymentApprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorPaymentApprovalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorPaymentApprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
