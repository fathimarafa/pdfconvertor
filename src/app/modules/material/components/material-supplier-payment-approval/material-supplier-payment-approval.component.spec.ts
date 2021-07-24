import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSupplierPaymentApprovalComponent } from './material-supplier-payment-approval.component';

describe('MaterialSupplierPaymentApprovalComponent', () => {
  let component: MaterialSupplierPaymentApprovalComponent;
  let fixture: ComponentFixture<MaterialSupplierPaymentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSupplierPaymentApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSupplierPaymentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
