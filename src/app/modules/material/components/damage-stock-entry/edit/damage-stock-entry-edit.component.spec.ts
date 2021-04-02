import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageStockEntryEditComponent } from './damage-stock-entry-edit.component';

describe('DamageStockEntryEditComponent', () => {
  let component: DamageStockEntryEditComponent;
  let fixture: ComponentFixture<DamageStockEntryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageStockEntryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageStockEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
