import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAdvanceApprovalComponent } from './client-advance-approval.component';

describe('ClientAdvanceApprovalComponent', () => {
  let component: ClientAdvanceApprovalComponent;
  let fixture: ComponentFixture<ClientAdvanceApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAdvanceApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAdvanceApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
