import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanPaymentApprovalEditComponent } from './foreman-payment-approval-edit.component';

describe('ForemanPaymentApprovalEditComponent', () => {
  let component: ForemanPaymentApprovalEditComponent;
  let fixture: ComponentFixture<ForemanPaymentApprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForemanPaymentApprovalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForemanPaymentApprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
