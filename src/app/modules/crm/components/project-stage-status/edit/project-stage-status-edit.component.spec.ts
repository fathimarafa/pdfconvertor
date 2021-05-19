import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStageStatusEditComponent } from './project-stage-status-edit.component';

describe('ProjectStageStatusEditComponent', () => {
  let component: ProjectStageStatusEditComponent;
  let fixture: ComponentFixture<ProjectStageStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStageStatusEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStageStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
