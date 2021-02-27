import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCategoryRegistrationComponent } from './material-category-registration.component';

describe('MaterialCategoryRegistrationComponent', () => {
  let component: MaterialCategoryRegistrationComponent;
  let fixture: ComponentFixture<MaterialCategoryRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCategoryRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCategoryRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
