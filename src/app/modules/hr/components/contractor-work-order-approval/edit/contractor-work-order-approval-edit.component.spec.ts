import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorWorkOrderApprovalEditComponent } from './contractor-work-order-approval-edit.component';

describe('ContractorWorkOrderApprovalEditComponent', () => {
  let component: ContractorWorkOrderApprovalEditComponent;
  let fixture: ComponentFixture<ContractorWorkOrderApprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorWorkOrderApprovalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorWorkOrderApprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
