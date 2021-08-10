import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLabourWagePaymentApprovalComponent } from './group-labour-wage-payment-approval.component';

describe('GroupLabourWagePaymentApprovalComponent', () => {
  let component: GroupLabourWagePaymentApprovalComponent;
  let fixture: ComponentFixture<GroupLabourWagePaymentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupLabourWagePaymentApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLabourWagePaymentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
