import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorattendanceApprovalComponent} from './subcontractor-labourgroupattendance-approval.component';

describe('SubcontractorattendanceApprovalComponent', () => {
  let component: SubcontractorattendanceApprovalComponent;
  let fixture: ComponentFixture<SubcontractorattendanceApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorattendanceApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorattendanceApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
