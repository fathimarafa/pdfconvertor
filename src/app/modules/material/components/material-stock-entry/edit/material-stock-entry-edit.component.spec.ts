import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialStockEntryEditComponent } from './material-stock-entry-edit.component';

describe('MaterialStockEntryEditComponent', () => {
  let component: MaterialStockEntryEditComponent;
  let fixture: ComponentFixture<MaterialStockEntryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialStockEntryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialStockEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
