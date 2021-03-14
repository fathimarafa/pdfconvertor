import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSupplierPaymentComponent } from './material-supplier-payment.component';

describe('MaterialSupplierPaymentComponent', () => {
  let component: MaterialSupplierPaymentComponent;
  let fixture: ComponentFixture<MaterialSupplierPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSupplierPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSupplierPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
