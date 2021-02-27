import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBlockFloorEditComponent } from './assign-block-floor-edit.component';

describe('AssignBlockFloorEditComponent', () => {
  let component: AssignBlockFloorEditComponent;
  let fixture: ComponentFixture<AssignBlockFloorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignBlockFloorEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBlockFloorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
