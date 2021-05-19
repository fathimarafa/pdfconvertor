import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatusEditComponent } from './project-status-edit.component';

describe('ProjectStatusEditComponent', () => {
  let component: ProjectStatusEditComponent;
  let fixture: ComponentFixture<ProjectStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStatusEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
