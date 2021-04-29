import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRegistrationEditComponent } from './template-registration-edit.component';

describe('TemplateRegistrationEditComponent', () => {
  let component: TemplateRegistrationEditComponent;
  let fixture: ComponentFixture<TemplateRegistrationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateRegistrationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
