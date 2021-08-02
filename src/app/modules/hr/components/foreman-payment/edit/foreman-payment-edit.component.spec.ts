import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanPaymentEditComponent } from './foreman-payment-edit.component';

describe('ForemanPaymentEditComponent', () => {
  let component: ForemanPaymentEditComponent;
  let fixture: ComponentFixture<ForemanPaymentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForemanPaymentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForemanPaymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
