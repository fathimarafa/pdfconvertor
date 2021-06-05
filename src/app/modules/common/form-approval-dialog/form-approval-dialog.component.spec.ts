import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormApprovalDialogComponent } from './form-approval-dialog.component';

describe('FormApprovalDialogComponent', () => {
  let component: FormApprovalDialogComponent;
  let fixture: ComponentFixture<FormApprovalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormApprovalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormApprovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
