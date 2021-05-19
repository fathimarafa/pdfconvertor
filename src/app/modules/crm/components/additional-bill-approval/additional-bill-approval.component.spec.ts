import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalBillApprovalComponent } from './additional-bill-approval.component';

describe('AdditionalBillApprovalComponent', () => {
  let component: AdditionalBillApprovalComponent;
  let fixture: ComponentFixture<AdditionalBillApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalBillApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalBillApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
