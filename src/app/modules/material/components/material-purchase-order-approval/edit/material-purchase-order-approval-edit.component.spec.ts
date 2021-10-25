import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPurchaseOrderApprovalEditComponent } from './material-purchase-order-approval-edit.component';

describe('MaterialPurchaseOrderEditComponent', () => {
  let component: MaterialPurchaseOrderApprovalEditComponent;
  let fixture: ComponentFixture<MaterialPurchaseOrderApprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPurchaseOrderApprovalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPurchaseOrderApprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
