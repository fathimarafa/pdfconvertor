import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSupplierAdvanceEditComponent } from './material-supplier-advance-edit.component';

describe('MaterialSupplierAdvanceEditComponent', () => {
  let component: MaterialSupplierAdvanceEditComponent;
  let fixture: ComponentFixture<MaterialSupplierAdvanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSupplierAdvanceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSupplierAdvanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
