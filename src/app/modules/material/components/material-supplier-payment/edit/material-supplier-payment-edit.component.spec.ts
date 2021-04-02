import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSupplierPaymentEditComponent } from './material-supplier-payment-edit.component';

describe('MaterialSupplierPaymentEditComponent', () => {
  let component: MaterialSupplierPaymentEditComponent;
  let fixture: ComponentFixture<MaterialSupplierPaymentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSupplierPaymentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSupplierPaymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
