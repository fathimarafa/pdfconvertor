import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCategoryEditComponent } from './work-category-edit.component';

describe('WorkCategoryEditComponent', () => {
  let component: WorkCategoryEditComponent;
  let fixture: ComponentFixture<WorkCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCategoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
