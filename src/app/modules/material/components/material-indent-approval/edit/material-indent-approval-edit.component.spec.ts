import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIndentApprovalEditComponent } from './material-indent-approval-edit.component';

describe('MaterialIndentApprovalEditComponent', () => {
  let component: MaterialIndentApprovalEditComponent;
  let fixture: ComponentFixture<MaterialIndentApprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialIndentApprovalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIndentApprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
