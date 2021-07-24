import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartBillComponent } from './part-bill.component';

describe('PartBillComponent', () => {
  let component: PartBillComponent;
  let fixture: ComponentFixture<PartBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
