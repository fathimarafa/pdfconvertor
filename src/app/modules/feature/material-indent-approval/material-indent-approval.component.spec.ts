import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIndentApprovalComponent } from './material-indent-approval.component';

describe('MaterialIndentApprovalComponent', () => {
  let component: MaterialIndentApprovalComponent;
  let fixture: ComponentFixture<MaterialIndentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialIndentApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIndentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
