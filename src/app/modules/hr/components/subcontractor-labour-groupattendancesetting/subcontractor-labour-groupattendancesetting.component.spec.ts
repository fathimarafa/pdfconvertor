import { ComponentFixture, TestBed } from '@angular/core/testing';
import{SubcontractorlabourgroupattendanceComponent} from './subcontractor-labour-groupattendancesetting.component';


describe('SubcontractorlabourgroupComponent', () => {
  let component: SubcontractorlabourgroupattendanceComponent;
  let fixture: ComponentFixture<SubcontractorlabourgroupattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorlabourgroupattendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorlabourgroupattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
