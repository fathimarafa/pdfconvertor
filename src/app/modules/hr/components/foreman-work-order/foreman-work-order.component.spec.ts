import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanWorkOrderComponent } from './foreman-work-order.component';

describe('ForemanWorkOrderComponent', () => {
  let component: ForemanWorkOrderComponent;
  let fixture: ComponentFixture<ForemanWorkOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForemanWorkOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForemanWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
