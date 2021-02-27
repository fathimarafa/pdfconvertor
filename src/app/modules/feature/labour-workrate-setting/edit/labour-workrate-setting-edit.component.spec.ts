import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourWorkrateSettingEditComponent } from './labour-workrate-setting-edit.component';

describe('LabourWorkrateSettingEditComponent', () => {
  let component: LabourWorkrateSettingEditComponent;
  let fixture: ComponentFixture<LabourWorkrateSettingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourWorkrateSettingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourWorkrateSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
