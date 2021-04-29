import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRegistrationComponent } from './template-registration.component';

describe('TemplateRegistrationComponent', () => {
  let component: TemplateRegistrationComponent;
  let fixture: ComponentFixture<TemplateRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
