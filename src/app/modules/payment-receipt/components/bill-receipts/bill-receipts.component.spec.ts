import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReceiptsComponent } from './bill-receipts.component';

describe('BillReceiptsComponent', () => {
  let component: BillReceiptsComponent;
  let fixture: ComponentFixture<BillReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
