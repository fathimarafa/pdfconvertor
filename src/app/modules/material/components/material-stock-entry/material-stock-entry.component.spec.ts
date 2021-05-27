import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialStockEntryComponent } from './material-stock-entry.component';

describe('MaterialStockEntryComponent', () => {
  let component: MaterialStockEntryComponent;
  let fixture: ComponentFixture<MaterialStockEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialStockEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialStockEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
