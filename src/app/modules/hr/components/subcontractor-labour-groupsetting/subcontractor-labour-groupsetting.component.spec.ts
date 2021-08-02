import { ComponentFixture, TestBed } from '@angular/core/testing';
import{SubcontractorlabourgroupComponent} from './subcontractor-labour-groupsetting.component';


describe('SubcontractorlabourgroupComponent', () => {
  let component: SubcontractorlabourgroupComponent;
  let fixture: ComponentFixture<SubcontractorlabourgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorlabourgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorlabourgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
