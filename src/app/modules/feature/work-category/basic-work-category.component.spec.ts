import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicWorkCategoryComponent } from './basic-work-category.component';

describe('BasicWorkCategoryComponent', () => {
  let component: BasicWorkCategoryComponent;
  let fixture: ComponentFixture<BasicWorkCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicWorkCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicWorkCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
