import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationBaseRateFeedingComponent } from './quotation-base-rate-feeding.component';

describe('QuotationBaseRateFeedingComponent', () => {
  let component: QuotationBaseRateFeedingComponent;
  let fixture: ComponentFixture<QuotationBaseRateFeedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationBaseRateFeedingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationBaseRateFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
