import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabourToProjectComponent } from './add-labour-to-project.component';

describe('AddLabourToProjectComponent', () => {
  let component: AddLabourToProjectComponent;
  let fixture: ComponentFixture<AddLabourToProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLabourToProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabourToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
