import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDefaultFormComponent } from './module-default-form.component';

describe('ModuleDefaultFormComponent', () => {
  let component: ModuleDefaultFormComponent;
  let fixture: ComponentFixture<ModuleDefaultFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleDefaultFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleDefaultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
