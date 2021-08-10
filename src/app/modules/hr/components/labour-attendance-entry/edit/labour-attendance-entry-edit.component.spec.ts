import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourAttendanceEntryEditComponent } from './labour-attendance-entry-edit.component';

describe('LabourAttendanceEntryEditComponent', () => {
  let component: LabourAttendanceEntryEditComponent;
  let fixture: ComponentFixture<LabourAttendanceEntryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourAttendanceEntryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourAttendanceEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
