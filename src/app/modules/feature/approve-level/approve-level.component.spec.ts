import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLevelComponent } from './approve-level.component';

describe('ApproveLevelComponent', () => {
  let component: ApproveLevelComponent;
  let fixture: ComponentFixture<ApproveLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
