import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryForComponent } from './enquiry-for.component';

describe('EnquiryForComponent', () => {
  let component: EnquiryForComponent;
  let fixture: ComponentFixture<EnquiryForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
