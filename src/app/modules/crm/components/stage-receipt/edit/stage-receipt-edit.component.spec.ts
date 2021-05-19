import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageReceiptEditComponent } from './stage-receipt-edit.component';

describe('StageReceiptEditComponent', () => {
  let component: StageReceiptEditComponent;
  let fixture: ComponentFixture<StageReceiptEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageReceiptEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StageReceiptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
