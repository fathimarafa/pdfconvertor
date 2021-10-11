import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorWorkOrderappEditComponent } from './subcontractor-work-orderapp-edit.component';

describe('SubcontractorWorkOrderappEditComponent', () => {
  let component: SubcontractorWorkOrderappEditComponent;
  let fixture: ComponentFixture<SubcontractorWorkOrderappEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcontractorWorkOrderappEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorWorkOrderappEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
