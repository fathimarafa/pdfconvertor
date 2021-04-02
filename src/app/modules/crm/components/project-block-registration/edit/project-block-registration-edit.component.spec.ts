import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBlockRegistrationEditComponent } from './project-block-registration-edit.component';

describe('ProjectBlockRegistrationEditComponent', () => {
  let component: ProjectBlockRegistrationEditComponent;
  let fixture: ComponentFixture<ProjectBlockRegistrationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectBlockRegistrationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBlockRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
