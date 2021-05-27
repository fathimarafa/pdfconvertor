import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLevelSettingComponent } from './form-level-setting.component';

describe('FormLevelSettingComponent', () => {
  let component: FormLevelSettingComponent;
  let fixture: ComponentFixture<FormLevelSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLevelSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLevelSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
