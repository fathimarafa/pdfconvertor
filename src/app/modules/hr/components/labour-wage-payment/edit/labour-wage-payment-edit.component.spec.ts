import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourWagePaymentEditComponent } from './labour-wage-payment-edit.component';

describe('LabourWagePaymentEditComponent', () => {
  let component: LabourWagePaymentEditComponent;
  let fixture: ComponentFixture<LabourWagePaymentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourWagePaymentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourWagePaymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
