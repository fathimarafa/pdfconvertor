import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHeadRegistrationEditComponent } from './account-head-registration-edit.component';

describe('AccountHeadRegistrationEditComponent', () => {
  let component: AccountHeadRegistrationEditComponent;
  let fixture: ComponentFixture<AccountHeadRegistrationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHeadRegistrationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHeadRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
