import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReceivedApprovalComponent } from './material-received-approval.component';

describe('MaterialReceivedApprovalComponent', () => {
  let component: MaterialReceivedApprovalComponent;
  let fixture: ComponentFixture<MaterialReceivedApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialReceivedApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialReceivedApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
