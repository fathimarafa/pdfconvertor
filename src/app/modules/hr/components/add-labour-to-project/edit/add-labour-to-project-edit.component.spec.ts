import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabourToProjectEditComponent } from './add-labour-to-project-edit.component';

describe('AddLabourToProjectEditComponent', () => {
  let component: AddLabourToProjectEditComponent;
  let fixture: ComponentFixture<AddLabourToProjectEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabourToProjectEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabourToProjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
