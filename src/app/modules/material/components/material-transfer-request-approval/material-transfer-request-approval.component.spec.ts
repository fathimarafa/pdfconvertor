import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTransferRequestApprovalComponent } from './material-transfer-request-approval.component';

describe('MaterialTransferRequestApprovalComponent', () => {
  let component: MaterialTransferRequestApprovalComponent;
  let fixture: ComponentFixture<MaterialTransferRequestApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTransferRequestApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTransferRequestApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
