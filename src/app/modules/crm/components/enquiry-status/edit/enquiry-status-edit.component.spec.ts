import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryStatusEditComponent } from './enquiry-status-edit.component';

describe('EnquiryStatusEditComponent', () => {
  let component: EnquiryStatusEditComponent;
  let fixture: ComponentFixture<EnquiryStatusEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryStatusEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
