import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFloorRegistrationComponent } from './project-floor-registration.component';

describe('ProjectFloorRegistrationComponent', () => {
  let component: ProjectFloorRegistrationComponent;
  let fixture: ComponentFixture<ProjectFloorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFloorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFloorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
