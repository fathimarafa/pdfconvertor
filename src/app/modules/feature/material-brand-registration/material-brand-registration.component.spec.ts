import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialBrandRegistrationComponent } from './material-brand-registration.component';

describe('MaterialBrandRegistrationComponent', () => {
  let component: MaterialBrandRegistrationComponent;
  let fixture: ComponentFixture<MaterialBrandRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialBrandRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialBrandRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
