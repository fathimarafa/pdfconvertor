import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPurchaseOrderComponent } from './material-purchase-order.component';

describe('MaterialPurchaseOrderComponent', () => {
  let component: MaterialPurchaseOrderComponent;
  let fixture: ComponentFixture<MaterialPurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPurchaseOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
