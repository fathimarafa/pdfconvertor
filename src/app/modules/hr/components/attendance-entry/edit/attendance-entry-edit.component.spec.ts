import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceEntryEditComponent } from './attendance-entry-edit.component';

describe('AttendanceEntryEditComponent', () => {
  let component: AttendanceEntryEditComponent;
  let fixture: ComponentFixture<AttendanceEntryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceEntryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
