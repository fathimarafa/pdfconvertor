import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorWorkOrderApprovalComponent } from './contractor-work-order-approval.component';

describe('ContractorWorkOrderApprovalComponent', () => {
  let component: ContractorWorkOrderApprovalComponent;
  let fixture: ComponentFixture<ContractorWorkOrderApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorWorkOrderApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorWorkOrderApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
