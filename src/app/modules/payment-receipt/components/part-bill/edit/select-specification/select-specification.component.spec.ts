import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSpecificationComponent } from './select-specification.component';

describe('SelectSpecificationComponent', () => {
  let component: SelectSpecificationComponent;
  let fixture: ComponentFixture<SelectSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSpecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
