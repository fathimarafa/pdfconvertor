import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaySettingEditComponent } from './holiday-setting-edit.component';

describe('HolidaySettingEditComponent', () => {
  let component: HolidaySettingEditComponent;
  let fixture: ComponentFixture<HolidaySettingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaySettingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaySettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
