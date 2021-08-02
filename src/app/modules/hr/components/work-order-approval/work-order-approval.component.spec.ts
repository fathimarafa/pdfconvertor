import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderApprovalComponent } from './work-order-approval.component';

describe('WorkOrderApprovalComponent', () => {
  let component: WorkOrderApprovalComponent;
  let fixture: ComponentFixture<WorkOrderApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
