import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSpecificationComponent } from './project-specification.component';

describe('ProjectSpecificationComponent', () => {
  let component: ProjectSpecificationComponent;
  let fixture: ComponentFixture<ProjectSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSpecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
