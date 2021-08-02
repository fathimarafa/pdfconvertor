import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SubcontractorWorkOrderComponent} from './subcontractor-work-order.component';

describe('SubcontractorWorkOrderComponent', () => {
  let component: SubcontractorWorkOrderComponent;
  let fixture: ComponentFixture<SubcontractorWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcontractorWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
