import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorWorkOrderEditComponent } from './contractor-work-order-edit.component';

describe('ContractorWorkOrderEditComponent', () => {
  let component: ContractorWorkOrderEditComponent;
  let fixture: ComponentFixture<ContractorWorkOrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorWorkOrderEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorWorkOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
