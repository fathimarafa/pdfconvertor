import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanWorkBillEditComponent } from './foreman-work-bill-edit.component';

describe('ForemanWorkBillEditComponent', () => {
  let component: ForemanWorkBillEditComponent;
  let fixture: ComponentFixture<ForemanWorkBillEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForemanWorkBillEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForemanWorkBillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
