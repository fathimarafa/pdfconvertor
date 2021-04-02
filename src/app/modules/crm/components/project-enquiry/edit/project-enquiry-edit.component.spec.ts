import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEnquiryEditComponent } from './project-enquiry-edit.component';

describe('ProjectEnquiryEditComponent', () => {
  let component: ProjectEnquiryEditComponent;
  let fixture: ComponentFixture<ProjectEnquiryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEnquiryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEnquiryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
