import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitRegistrationEditComponent } from './unit-registration-edit.component';

describe('UnitRegistrationEditComponent', () => {
  let component: UnitRegistrationEditComponent;
  let fixture: ComponentFixture<UnitRegistrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitRegistrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
