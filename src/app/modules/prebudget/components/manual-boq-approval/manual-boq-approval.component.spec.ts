import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualBoqApprovalComponent } from './manual-boq-approval.component';

describe('ManualBoqApprovalComponent', () => {
  let component: ManualBoqApprovalComponent;
  let fixture: ComponentFixture<ManualBoqApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualBoqApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualBoqApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
