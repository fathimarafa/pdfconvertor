import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorlabourgroupattendanceEditComponent} from './subcontractor-labour-groupattendancesetting-edit.component';

describe('SubcontractorlabourgroupEditComponent', () => {
  let component: SubcontractorlabourgroupattendanceEditComponent;
  let fixture: ComponentFixture<SubcontractorlabourgroupattendanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorlabourgroupattendanceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorlabourgroupattendanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
