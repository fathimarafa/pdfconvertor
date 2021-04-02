import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountRegistrationComponent } from './bank-account-registration.component';

describe('BankAccountRegistrationComponent', () => {
  let component: BankAccountRegistrationComponent;
  let fixture: ComponentFixture<BankAccountRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
