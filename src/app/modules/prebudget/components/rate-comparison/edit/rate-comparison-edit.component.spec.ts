import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComparisonEditComponent } from './rate-comparison-edit.component';

describe('RateComparisonEditComponent', () => {
  let component: RateComparisonEditComponent;
  let fixture: ComponentFixture<RateComparisonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateComparisonEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateComparisonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
