import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubcontractorIndentEditComponent } from '../../subcontractor-indent/subcontractor-indent-edit/subcontractor-indent-edit.component';
import { SubcontractorIndentApprovalEditComponent } from './subcontractor-indent-approval-edit.component';



describe('SubcontractorIndentApprovalEditComponent', () => {
  let component: SubcontractorIndentApprovalEditComponent;
  let fixture: ComponentFixture<SubcontractorIndentApprovalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorIndentApprovalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorIndentApprovalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
