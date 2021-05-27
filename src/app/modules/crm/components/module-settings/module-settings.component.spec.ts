import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSettingsComponent } from './module-settings.component';

describe('ModuleSettingsComponent', () => {
  let component: ModuleSettingsComponent;
  let fixture: ComponentFixture<ModuleSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
