import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryForEditComponent } from './enquiry-for-edit.component';

describe('EnquiryForEditComponent', () => {
  let component: EnquiryForEditComponent;
  let fixture: ComponentFixture<EnquiryForEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryForEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryForEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
