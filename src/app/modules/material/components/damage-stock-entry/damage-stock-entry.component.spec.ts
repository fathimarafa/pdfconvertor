import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageStockEntryComponent } from './damage-stock-entry.component';

describe('DamageStockEntryComponent', () => {
  let component: DamageStockEntryComponent;
  let fixture: ComponentFixture<DamageStockEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageStockEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageStockEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
