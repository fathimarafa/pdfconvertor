import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIssueApprovalComponent } from './material-issue-approval.component';

describe('MaterialIssueApprovalComponent', () => {
  let component: MaterialIssueApprovalComponent;
  let fixture: ComponentFixture<MaterialIssueApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialIssueApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIssueApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
