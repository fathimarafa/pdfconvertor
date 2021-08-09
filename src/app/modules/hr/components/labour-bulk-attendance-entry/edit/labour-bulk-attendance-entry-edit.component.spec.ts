import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourBulkAttendanceEntryEditComponent } from './labour-bulk-attendance-entry-edit.component';

describe('LabourBulkAttendanceEntryEditComponent', () => {
  let component: LabourBulkAttendanceEntryEditComponent;
  let fixture: ComponentFixture<LabourBulkAttendanceEntryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourBulkAttendanceEntryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourBulkAttendanceEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
