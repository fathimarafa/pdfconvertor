import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanPaymentComponent } from './foreman-payment.component';

describe('ForemanPaymentComponent', () => {
  let component: ForemanPaymentComponent;
  let fixture: ComponentFixture<ForemanPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForemanPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForemanPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
