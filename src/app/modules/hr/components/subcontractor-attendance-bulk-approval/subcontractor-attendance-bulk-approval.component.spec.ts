import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorAttendanceBulkApprovalComponent } from './subcontractor-attendance-bulk-approval.component';

describe('SubcontractorAttendanceBulkApprovalComponent', () => {
  let component: SubcontractorAttendanceBulkApprovalComponent;
  let fixture: ComponentFixture<SubcontractorAttendanceBulkApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorAttendanceBulkApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorAttendanceBulkApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
