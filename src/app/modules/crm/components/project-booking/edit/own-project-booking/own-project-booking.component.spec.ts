import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnProjectBookingComponent } from './own-project-booking.component';

describe('OwnProjectBookingComponent', () => {
  let component: OwnProjectBookingComponent;
  let fixture: ComponentFixture<OwnProjectBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnProjectBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnProjectBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
