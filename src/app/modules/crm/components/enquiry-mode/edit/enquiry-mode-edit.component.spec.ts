import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryModeEditComponent } from './enquiry-mode-edit.component';

describe('EnquiryModeEditComponent', () => {
  let component: EnquiryModeEditComponent;
  let fixture: ComponentFixture<EnquiryModeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryModeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryModeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
