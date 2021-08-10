import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourAttendanceEntryApprovalComponent } from './labour-attendance-entry-approval.component';

describe('LabourAttendanceEntryApprovalComponent', () => {
  let component: LabourAttendanceEntryApprovalComponent;
  let fixture: ComponentFixture<LabourAttendanceEntryApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourAttendanceEntryApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourAttendanceEntryApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
