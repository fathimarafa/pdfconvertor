import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SubcontractorbillPaymentComponent } from './subcontractorbillpayment.component';

describe('SubcontractorbillpaymentComponent', () => {
  let component: SubcontractorbillPaymentComponent;
  let fixture: ComponentFixture<SubcontractorbillPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorbillPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorbillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
