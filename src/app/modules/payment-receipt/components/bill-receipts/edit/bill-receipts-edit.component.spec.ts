import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReceiptsEditComponent } from './bill-receipts-edit.component';

describe('BillReceiptsEditComponent', () => {
  let component: BillReceiptsEditComponent;
  let fixture: ComponentFixture<BillReceiptsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillReceiptsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillReceiptsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
