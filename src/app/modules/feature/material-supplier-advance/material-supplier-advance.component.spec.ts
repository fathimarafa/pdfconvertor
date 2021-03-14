import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSupplierAdvanceComponent } from './material-supplier-advance.component';

describe('MaterialSupplierAdvanceComponent', () => {
  let component: MaterialSupplierAdvanceComponent;
  let fixture: ComponentFixture<MaterialSupplierAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSupplierAdvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSupplierAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
