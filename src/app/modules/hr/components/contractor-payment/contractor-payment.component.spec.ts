import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPaymentComponent } from './contractor-payment.component';

describe('ContractorPaymentComponent', () => {
  let component: ContractorPaymentComponent;
  let fixture: ComponentFixture<ContractorPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
