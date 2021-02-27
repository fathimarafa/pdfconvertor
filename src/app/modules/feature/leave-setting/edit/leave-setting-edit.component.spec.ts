import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSettingEditComponent } from './leave-setting-edit.component';

describe('LeaveSettingEditComponent', () => {
  let component: LeaveSettingEditComponent;
  let fixture: ComponentFixture<LeaveSettingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveSettingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
