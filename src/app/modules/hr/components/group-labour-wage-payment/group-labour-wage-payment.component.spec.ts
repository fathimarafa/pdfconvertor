import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLabourWagePaymentComponent } from './group-labour-wage-payment.component';

describe('GroupLabourWagePaymentComponent', () => {
  let component: GroupLabourWagePaymentComponent;
  let fixture: ComponentFixture<GroupLabourWagePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupLabourWagePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLabourWagePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
