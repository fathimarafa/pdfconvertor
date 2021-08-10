import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourAttendanceEntryComponent } from './labour-attendance-entry.component';

describe('LabourAttendanceEntryComponent', () => {
  let component: LabourAttendanceEntryComponent;
  let fixture: ComponentFixture<LabourAttendanceEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourAttendanceEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourAttendanceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
