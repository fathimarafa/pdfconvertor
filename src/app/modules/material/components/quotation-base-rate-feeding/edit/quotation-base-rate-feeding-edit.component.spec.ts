import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationBaseRateFeedingEditComponent } from './quotation-base-rate-feeding-edit.component';

describe('QuotationBaseRateFeedingEditComponent', () => {
  let component: QuotationBaseRateFeedingEditComponent;
  let fixture: ComponentFixture<QuotationBaseRateFeedingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationBaseRateFeedingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationBaseRateFeedingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
