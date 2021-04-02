import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBlockFloorComponent } from './assign-block-floor.component';

describe('AssignBlockFloorComponent', () => {
  let component: AssignBlockFloorComponent;
  let fixture: ComponentFixture<AssignBlockFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignBlockFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBlockFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
