import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLevelSettingEditComponent } from './form-level-setting-edit.component';

describe('FormLevelSettingEditComponent', () => {
  let component: FormLevelSettingEditComponent;
  let fixture: ComponentFixture<FormLevelSettingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLevelSettingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLevelSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
