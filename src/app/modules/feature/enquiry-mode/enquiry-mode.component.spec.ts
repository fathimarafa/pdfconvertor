import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryModeComponent } from './enquiry-mode.component';

describe('EnquiryModeComponent', () => {
  let component: EnquiryModeComponent;
  let fixture: ComponentFixture<EnquiryModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
