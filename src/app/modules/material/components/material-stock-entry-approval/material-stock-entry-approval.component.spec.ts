import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialStockEntryApprovalComponent } from './material-stock-entry-approval.component';

describe('MaterialStockEntryApprovalComponent', () => {
  let component: MaterialStockEntryApprovalComponent;
  let fixture: ComponentFixture<MaterialStockEntryApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialStockEntryApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialStockEntryApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
