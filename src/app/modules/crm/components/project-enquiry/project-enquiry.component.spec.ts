import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEnquiryComponent } from './project-enquiry.component';

describe('ProjectEnquiryComponent', () => {
  let component: ProjectEnquiryComponent;
  let fixture: ComponentFixture<ProjectEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
