import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageReceiptComponent } from './stage-receipt.component';

describe('StageReceiptComponent', () => {
  let component: StageReceiptComponent;
  let fixture: ComponentFixture<StageReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StageReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
