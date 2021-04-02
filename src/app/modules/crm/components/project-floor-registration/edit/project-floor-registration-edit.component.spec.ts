import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFloorRegistrationEditComponent } from './project-floor-registration-edit.component';

describe('ProjectFloorRegistrationEditComponent', () => {
  let component: ProjectFloorRegistrationEditComponent;
  let fixture: ComponentFixture<ProjectFloorRegistrationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFloorRegistrationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFloorRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
