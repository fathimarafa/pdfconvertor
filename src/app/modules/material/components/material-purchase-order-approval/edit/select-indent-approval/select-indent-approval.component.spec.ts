import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIndentApprovalComponent } from './select-indent-approval.component';

describe('SelectIndentApprovalComponent', () => {
  let component: SelectIndentApprovalComponent;
  let fixture: ComponentFixture<SelectIndentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIndentApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIndentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
