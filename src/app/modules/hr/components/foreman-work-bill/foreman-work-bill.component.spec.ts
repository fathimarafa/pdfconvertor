import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanWorkBillComponent } from './foreman-work-bill.component';

describe('ForemanWorkBillComponent', () => {
  let component: ForemanWorkBillComponent;
  let fixture: ComponentFixture<ForemanWorkBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForemanWorkBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForemanWorkBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
