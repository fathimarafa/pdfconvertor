import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegistrationEditComponent } from './supplier-registration-edit.component';

describe('SupplierRegistrationEditComponent', () => {
  let component: SupplierRegistrationEditComponent;
  let fixture: ComponentFixture<SupplierRegistrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierRegistrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
