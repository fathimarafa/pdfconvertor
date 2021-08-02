import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalBillComponent } from './additional-bill.component';

describe('AdditionalBillComponent', () => {
  let component: AdditionalBillComponent;
  let fixture: ComponentFixture<AdditionalBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
