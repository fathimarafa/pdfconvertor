import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPurchaseReturnEditComponent } from './material-purchase-return-edit.component';

describe('MaterialPurchaseReturnEditComponent', () => {
  let component: MaterialPurchaseReturnEditComponent;
  let fixture: ComponentFixture<MaterialPurchaseReturnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPurchaseReturnEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPurchaseReturnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
