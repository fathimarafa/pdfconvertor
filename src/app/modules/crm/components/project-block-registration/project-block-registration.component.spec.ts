import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBlockRegistrationComponent } from './project-block-registration.component';

describe('ProjectBlockRegistrationComponent', () => {
  let component: ProjectBlockRegistrationComponent;
  let fixture: ComponentFixture<ProjectBlockRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectBlockRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBlockRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
