import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCategoryRegistrationEditComponent } from './material-category-registration-edit.component';

describe('MaterialCategoryRegistrationEditComponent', () => {
  let component: MaterialCategoryRegistrationEditComponent;
  let fixture: ComponentFixture<MaterialCategoryRegistrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCategoryRegistrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCategoryRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
