import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorWorkBillEditComponent } from './subcontractor-work-bill-edit.component';

describe('SubcontractorWorkBillEditComponent', () => {
  let component: SubcontractorWorkBillEditComponent;
  let fixture: ComponentFixture<SubcontractorWorkBillEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorWorkBillEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorWorkBillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
