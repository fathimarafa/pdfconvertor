import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPurchaseReturnComponent } from './material-purchase-return.component';

describe('MaterialPurchaseReturnComponent', () => {
  let component: MaterialPurchaseReturnComponent;
  let fixture: ComponentFixture<MaterialPurchaseReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPurchaseReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
