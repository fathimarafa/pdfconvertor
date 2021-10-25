import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorlabourgroupattendanceapprovalEditComponent} from './subcontractor-labour-groupattendancesetting-approval-edit.component';

describe('SubcontractorlabourgroupattendanceapprovalEditComponent', () => {
  let component:SubcontractorlabourgroupattendanceapprovalEditComponent;
  let fixture: ComponentFixture<SubcontractorlabourgroupattendanceapprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorlabourgroupattendanceapprovalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorlabourgroupattendanceapprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
