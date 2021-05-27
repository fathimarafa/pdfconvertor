import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageStockEntryApprovalComponent } from './damage-stock-entry-approval.component';

describe('DamageStockEntryApprovalComponent', () => {
  let component: DamageStockEntryApprovalComponent;
  let fixture: ComponentFixture<DamageStockEntryApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageStockEntryApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageStockEntryApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
