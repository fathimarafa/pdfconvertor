import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourBulkAttendanceEntryComponent } from './labour-bulk-attendance-entry.component';

describe('LabourBulkAttendanceEntryComponent', () => {
  let component: LabourBulkAttendanceEntryComponent;
  let fixture: ComponentFixture<LabourBulkAttendanceEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourBulkAttendanceEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourBulkAttendanceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
