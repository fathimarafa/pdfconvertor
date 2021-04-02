import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtProjectComponent } from './govt-project.component';

describe('GovtProjectComponent', () => {
  let component: GovtProjectComponent;
  let fixture: ComponentFixture<GovtProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovtProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovtProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
