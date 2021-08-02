import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourWagePaymentComponent } from './labour-wage-payment.component';

describe('LabourWagePaymentComponent', () => {
  let component: LabourWagePaymentComponent;
  let fixture: ComponentFixture<LabourWagePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourWagePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourWagePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
