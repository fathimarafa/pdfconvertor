import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComparisonComponent } from './rate-comparison.component';

describe('RateComparisonComponent', () => {
  let component: RateComparisonComponent;
  let fixture: ComponentFixture<RateComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
