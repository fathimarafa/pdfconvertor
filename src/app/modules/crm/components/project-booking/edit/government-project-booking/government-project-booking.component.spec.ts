import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentProjectBookingComponent } from './government-project-booking.component';

describe('GovernmentProjectBookingComponent', () => {
  let component: GovernmentProjectBookingComponent;
  let fixture: ComponentFixture<GovernmentProjectBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovernmentProjectBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentProjectBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
