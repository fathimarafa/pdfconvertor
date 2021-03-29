import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountRegistrationEditComponent } from './bank-account-registration-edit.component';

describe('BankAccountRegistrationEditComponent', () => {
  let component: BankAccountRegistrationEditComponent;
  let fixture: ComponentFixture<BankAccountRegistrationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountRegistrationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
