import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundingComponent } from './refunding.component';

describe('RefundingComponent', () => {
  let component: RefundingComponent;
  let fixture: ComponentFixture<RefundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
