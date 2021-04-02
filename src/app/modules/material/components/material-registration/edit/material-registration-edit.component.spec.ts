import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRegistrationEditComponent } from './material-registration-edit.component';

describe('MaterialRegistrationEditComponent', () => {
  let component: MaterialRegistrationEditComponent;
  let fixture: ComponentFixture<MaterialRegistrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialRegistrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
