import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorbillpaymentapprovalEditComponent } from './subcontractorbillpayment-approval-edit.component';

describe('SubcontractorbillpaymentapprovalEditComponent', () => {
  let component: SubcontractorbillpaymentapprovalEditComponent;
  let fixture: ComponentFixture<SubcontractorbillpaymentapprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorbillpaymentapprovalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorbillpaymentapprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
