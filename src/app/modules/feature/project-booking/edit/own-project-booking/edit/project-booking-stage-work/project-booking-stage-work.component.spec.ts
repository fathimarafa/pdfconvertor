import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBookingStageWorkComponent } from './project-booking-stage-work.component';

describe('ProjectBookingStageWorkComponent', () => {
  let component: ProjectBookingStageWorkComponent;
  let fixture: ComponentFixture<ProjectBookingStageWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBookingStageWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBookingStageWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
