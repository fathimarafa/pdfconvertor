import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalBillGenerationComponent } from './additional-bill-generation.component';

describe('AdditionalBillGenerationComponent', () => {
  let component: AdditionalBillGenerationComponent;
  let fixture: ComponentFixture<AdditionalBillGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalBillGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalBillGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
