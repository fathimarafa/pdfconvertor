import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReceiptsApprovalComponent } from './bill-receipts-approval.component';

describe('BillReceiptsApprovalComponent', () => {
  let component: BillReceiptsApprovalComponent;
  let fixture: ComponentFixture<BillReceiptsApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillReceiptsApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillReceiptsApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
