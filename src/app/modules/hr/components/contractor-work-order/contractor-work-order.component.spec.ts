import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorWorkOrderComponent } from './contractor-work-order.component';

describe('ContractorWorkOrderComponent', () => {
  let component: ContractorWorkOrderComponent;
  let fixture: ComponentFixture<ContractorWorkOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorWorkOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
