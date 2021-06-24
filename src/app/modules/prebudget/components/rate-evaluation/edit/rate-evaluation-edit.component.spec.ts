import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateEvaluationEditComponent } from './rate-evaluation-edit.component';

describe('RateEvaluationEditComponent', () => {
  let component: RateEvaluationEditComponent;
  let fixture: ComponentFixture<RateEvaluationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateEvaluationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateEvaluationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
