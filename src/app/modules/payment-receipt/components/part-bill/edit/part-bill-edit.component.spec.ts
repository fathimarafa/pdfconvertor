import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartBillEditComponent } from './part-bill-edit.component';

describe('PartBillEditComponent', () => {
  let component: PartBillEditComponent;
  let fixture: ComponentFixture<PartBillEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartBillEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartBillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
