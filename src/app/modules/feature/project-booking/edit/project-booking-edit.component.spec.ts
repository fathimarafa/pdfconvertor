import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBookingEditComponent } from './project-booking-edit.component';

describe('ProjectBookingEditComponent', () => {
  let component: ProjectBookingEditComponent;
  let fixture: ComponentFixture<ProjectBookingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBookingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBookingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
