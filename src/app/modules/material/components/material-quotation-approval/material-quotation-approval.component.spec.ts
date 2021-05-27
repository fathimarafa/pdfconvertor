import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialQuotationApprovalComponent } from './material-quotation-approval.component';

describe('MaterialQuotationApprovalComponent', () => {
  let component: MaterialQuotationApprovalComponent;
  let fixture: ComponentFixture<MaterialQuotationApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialQuotationApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialQuotationApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
