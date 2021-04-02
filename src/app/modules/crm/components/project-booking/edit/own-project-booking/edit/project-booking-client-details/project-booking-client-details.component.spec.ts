import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBookingClientDetailsComponent } from './project-booking-client-details.component';

describe('ProjectBookingClientDetailsComponent', () => {
  let component: ProjectBookingClientDetailsComponent;
  let fixture: ComponentFixture<ProjectBookingClientDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBookingClientDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBookingClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
