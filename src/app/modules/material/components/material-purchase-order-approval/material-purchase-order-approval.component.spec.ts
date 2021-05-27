import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPurchaseOrderApprovalComponent } from './material-purchase-order-approval.component';

describe('MaterialPurchaseOrderApprovalComponent', () => {
  let component: MaterialPurchaseOrderApprovalComponent;
  let fixture: ComponentFixture<MaterialPurchaseOrderApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPurchaseOrderApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPurchaseOrderApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
