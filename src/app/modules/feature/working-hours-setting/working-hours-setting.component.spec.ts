import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHoursSettingComponent } from './working-hours-setting.component';

describe('WorkingHoursSettingComponent', () => {
  let component: WorkingHoursSettingComponent;
  let fixture: ComponentFixture<WorkingHoursSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingHoursSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHoursSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
