import { ComponentFixture, TestBed } from '@angular/core/testing';
import{SubcontractorWorkBillappEditComponent}from 'src/app/modules/hr/components/subcontractor-work-bill-approval/edit/subcontractor-work-billapp-edit.component'


describe('SubcontractorWorkBillappEditComponent', () => {
  let component: SubcontractorWorkBillappEditComponent;
  let fixture: ComponentFixture<SubcontractorWorkBillappEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorWorkBillappEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorWorkBillappEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
