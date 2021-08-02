import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorWorkOrderEditComponent } from './subcontractor-work-order-edit.component';

describe('SubcontractorWorkOrderEditComponent', () => {
  let component: SubcontractorWorkOrderEditComponent;
  let fixture: ComponentFixture<SubcontractorWorkOrderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcontractorWorkOrderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorWorkOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
