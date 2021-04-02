import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourWorkrateSettingComponent } from './labour-workrate-setting.component';

describe('LabourWorkrateSettingComponent', () => {
  let component: LabourWorkrateSettingComponent;
  let fixture: ComponentFixture<LabourWorkrateSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourWorkrateSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourWorkrateSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
