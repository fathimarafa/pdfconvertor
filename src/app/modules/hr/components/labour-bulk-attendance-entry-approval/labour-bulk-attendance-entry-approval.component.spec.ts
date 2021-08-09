import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourBulkAttendanceEntryApprovalComponent } from './labour-bulk-attendance-entry-approval.component';

describe('LabourBulkAttendanceEntryApprovalComponent', () => {
  let component: LabourBulkAttendanceEntryApprovalComponent;
  let fixture: ComponentFixture<LabourBulkAttendanceEntryApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourBulkAttendanceEntryApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourBulkAttendanceEntryApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
