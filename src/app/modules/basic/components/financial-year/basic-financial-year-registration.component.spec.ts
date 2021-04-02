import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFinancialYearRegistrationComponent } from './basic-financial-year-registration.component';

describe('BasicFinancialYearRegistrationComponent', () => {
  let component: BasicFinancialYearRegistrationComponent;
  let fixture: ComponentFixture<BasicFinancialYearRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicFinancialYearRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicFinancialYearRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
