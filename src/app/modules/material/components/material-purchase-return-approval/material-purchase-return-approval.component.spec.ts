import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPurchaseReturnApprovalComponent } from './material-purchase-return-approval.component';

describe('MaterialPurchaseReturnApprovalComponent', () => {
  let component: MaterialPurchaseReturnApprovalComponent;
  let fixture: ComponentFixture<MaterialPurchaseReturnApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPurchaseReturnApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPurchaseReturnApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
