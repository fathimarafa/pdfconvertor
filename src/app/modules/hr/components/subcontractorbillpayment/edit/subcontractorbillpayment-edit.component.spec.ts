import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorbillpaymentEditComponent } from './subcontractorbillpayment-edit.component';

describe('SubcontractorbillpaymentEditComponent', () => {
  let component: SubcontractorbillpaymentEditComponent;
  let fixture: ComponentFixture<SubcontractorbillpaymentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorbillpaymentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorbillpaymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
