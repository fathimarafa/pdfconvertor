import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorWorkBillComponent } from './subcontractor-work-bill.component';

describe('SubcontractorWorkBillComponent', () => {
  let component: SubcontractorWorkBillComponent;
  let fixture: ComponentFixture<SubcontractorWorkBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorWorkBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorWorkBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
