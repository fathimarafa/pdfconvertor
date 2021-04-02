import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialBrandRegistrationEditComponent } from './material-brand-registration-edit.component';

describe('MaterialBrandRegistrationEditComponent', () => {
  let component: MaterialBrandRegistrationEditComponent;
  let fixture: ComponentFixture<MaterialBrandRegistrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialBrandRegistrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialBrandRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
