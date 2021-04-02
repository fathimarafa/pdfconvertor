import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHeadRegistrationComponent } from './account-head-registration.component';

describe('AccountHeadRegistrationComponent', () => {
  let component: AccountHeadRegistrationComponent;
  let fixture: ComponentFixture<AccountHeadRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHeadRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHeadRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
