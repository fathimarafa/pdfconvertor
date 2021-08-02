import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLabourWagePaymentEditComponent } from './group-labour-wage-payment-edit.component';

describe('GroupLabourWagePaymentEditComponent', () => {
  let component: GroupLabourWagePaymentEditComponent;
  let fixture: ComponentFixture<GroupLabourWagePaymentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupLabourWagePaymentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLabourWagePaymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
