import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanWorkOrderEditComponent } from './foreman-work-order-edit.component';

describe('ForemanWorkOrderEditComponent', () => {
  let component: ForemanWorkOrderEditComponent;
  let fixture: ComponentFixture<ForemanWorkOrderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForemanWorkOrderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForemanWorkOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
