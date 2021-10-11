import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalBillappComponent } from './additional-billapp.component';

describe('AdditionalBillappComponent', () => {
  let component: AdditionalBillappComponent;
  let fixture: ComponentFixture<AdditionalBillappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalBillappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalBillappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
