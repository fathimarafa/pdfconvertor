import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIndentComponent } from './select-indent.component';

describe('SelectIndentComponent', () => {
  let component: SelectIndentComponent;
  let fixture: ComponentFixture<SelectIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIndentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
