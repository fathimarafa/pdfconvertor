import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSpecificationEditComponent } from './project-specification-edit.component';

describe('ProjectSpecificationEditComponent', () => {
  let component: ProjectSpecificationEditComponent;
  let fixture: ComponentFixture<ProjectSpecificationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSpecificationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSpecificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
