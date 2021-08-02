import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPaymentEditComponent } from './contractor-payment-edit.component';

describe('ContractorPaymentEditComponent', () => {
  let component: ContractorPaymentEditComponent;
  let fixture: ComponentFixture<ContractorPaymentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorPaymentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorPaymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
