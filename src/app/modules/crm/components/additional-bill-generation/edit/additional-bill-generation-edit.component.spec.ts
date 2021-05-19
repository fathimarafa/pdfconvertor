import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalBillGenerationEditComponent } from './additional-bill-generation-edit.component';

describe('AdditionalBillGenerationEditComponent', () => {
  let component: AdditionalBillGenerationEditComponent;
  let fixture: ComponentFixture<AdditionalBillGenerationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalBillGenerationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalBillGenerationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
