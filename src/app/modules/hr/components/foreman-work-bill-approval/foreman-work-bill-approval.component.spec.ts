import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanWorkBillApprovalComponent } from './foreman-work-bill-approval.component';

describe('ForemanWorkBillApprovalComponent', () => {
  let component: ForemanWorkBillApprovalComponent;
  let fixture: ComponentFixture<ForemanWorkBillApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForemanWorkBillApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForemanWorkBillApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
