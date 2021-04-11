import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationRegistrationEditComponent } from './specification-registration-edit.component';

describe('SpecificationRegistrationEditComponent', () => {
  let component: SpecificationRegistrationEditComponent;
  let fixture: ComponentFixture<SpecificationRegistrationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationRegistrationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
