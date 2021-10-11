import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanWorkBillApprovalEditComponent } from './foreman-work-bill-approval-edit.component';

describe('ForemanWorkBillApprovalEditComponent', () => {
  let component: ForemanWorkBillApprovalEditComponent;
  let fixture: ComponentFixture<ForemanWorkBillApprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForemanWorkBillApprovalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForemanWorkBillApprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
