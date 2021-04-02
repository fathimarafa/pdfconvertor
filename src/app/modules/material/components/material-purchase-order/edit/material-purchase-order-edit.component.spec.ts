import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPurchaseOrderEditComponent } from './material-purchase-order-edit.component';

describe('MaterialPurchaseOrderEditComponent', () => {
  let component: MaterialPurchaseOrderEditComponent;
  let fixture: ComponentFixture<MaterialPurchaseOrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPurchaseOrderEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPurchaseOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
