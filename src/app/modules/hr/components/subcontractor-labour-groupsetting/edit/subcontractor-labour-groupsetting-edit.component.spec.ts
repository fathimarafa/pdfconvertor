import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorlabourgroupEditComponent } from './subcontractor-labour-groupsetting-edit.component';

describe('SubcontractorlabourgroupEditComponent', () => {
  let component: SubcontractorlabourgroupEditComponent;
  let fixture: ComponentFixture<SubcontractorlabourgroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorlabourgroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorlabourgroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
