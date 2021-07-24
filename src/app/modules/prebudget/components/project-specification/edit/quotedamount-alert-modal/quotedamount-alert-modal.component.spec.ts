import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotedamountAlertModalComponent } from './quotedamount-alert-modal.component';

describe('QuotedamountAlertModalComponent', () => {
  let component: QuotedamountAlertModalComponent;
  let fixture: ComponentFixture<QuotedamountAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotedamountAlertModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotedamountAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
