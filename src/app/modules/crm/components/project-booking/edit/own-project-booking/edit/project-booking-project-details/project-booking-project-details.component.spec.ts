import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBookingProjectDetailsComponent } from './project-booking-project-details.component';

describe('ProjectBookingProjectDetailsComponent', () => {
  let component: ProjectBookingProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectBookingProjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBookingProjectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBookingProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
