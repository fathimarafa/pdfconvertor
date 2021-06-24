import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateEvaluationComponent } from './rate-evaluation.component';

describe('RateEvaluationComponent', () => {
  let component: RateEvaluationComponent;
  let fixture: ComponentFixture<RateEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
