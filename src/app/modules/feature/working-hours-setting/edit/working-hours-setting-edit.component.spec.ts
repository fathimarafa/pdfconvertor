import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHoursSettingEditComponent } from './working-hours-setting-edit.component';

describe('WorkingHoursSettingEditComponent', () => {
  let component: WorkingHoursSettingEditComponent;
  let fixture: ComponentFixture<WorkingHoursSettingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingHoursSettingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHoursSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
