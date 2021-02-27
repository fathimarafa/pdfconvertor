import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDefaultComponent } from './module-default.component';

describe('ModuleDefaultComponent', () => {
  let component: ModuleDefaultComponent;
  let fixture: ComponentFixture<ModuleDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
