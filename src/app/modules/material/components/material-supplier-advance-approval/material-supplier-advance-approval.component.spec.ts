import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSupplierAdvanceApprovalComponent } from './material-supplier-advance-approval.component';

describe('MaterialSupplierAdvanceApprovalComponent', () => {
  let component: MaterialSupplierAdvanceApprovalComponent;
  let fixture: ComponentFixture<MaterialSupplierAdvanceApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSupplierAdvanceApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSupplierAdvanceApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
