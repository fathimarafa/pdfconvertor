import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorWorkBillApprovalComponent } from './subcontractor-work-bill-approval.component';

describe('SubcontractorWorkBillApprovalComponent', () => {
  let component: SubcontractorWorkBillApprovalComponent;
  let fixture: ComponentFixture<SubcontractorWorkBillApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorWorkBillApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorWorkBillApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
