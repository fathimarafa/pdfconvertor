import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDefaultFormMultistepComponent } from './module-default-form-multistep.component';

describe('ModuleDefaultFormMultistepComponent', () => {
  let component: ModuleDefaultFormMultistepComponent;
  let fixture: ComponentFixture<ModuleDefaultFormMultistepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleDefaultFormMultistepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleDefaultFormMultistepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
