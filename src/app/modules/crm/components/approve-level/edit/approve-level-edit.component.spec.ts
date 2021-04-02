import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLevelEditComponent } from './approve-level-edit.component';

describe('ApproveLevelEditComponent', () => {
  let component: ApproveLevelEditComponent;
  let fixture: ComponentFixture<ApproveLevelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveLevelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveLevelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
