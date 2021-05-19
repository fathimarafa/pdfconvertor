import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStageStatusComponent } from './project-stage-status.component';

describe('ProjectStageStatusComponent', () => {
  let component: ProjectStageStatusComponent;
  let fixture: ComponentFixture<ProjectStageStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStageStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
