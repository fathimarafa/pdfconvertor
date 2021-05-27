import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrevilegeComponent } from './user-previlege.component';

describe('UserPrevilegeComponent', () => {
  let component: UserPrevilegeComponent;
  let fixture: ComponentFixture<UserPrevilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPrevilegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPrevilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
