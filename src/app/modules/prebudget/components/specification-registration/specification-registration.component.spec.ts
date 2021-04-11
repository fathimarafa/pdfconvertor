import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationRegistrationComponent } from './specification-registration.component';

describe('SpecificationRegistrationComponent', () => {
  let component: SpecificationRegistrationComponent;
  let fixture: ComponentFixture<SpecificationRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
