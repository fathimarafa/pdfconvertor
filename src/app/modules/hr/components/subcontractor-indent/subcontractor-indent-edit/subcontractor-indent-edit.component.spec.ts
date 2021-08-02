import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorIndentEditComponent } from './subcontractor-indent-edit.component';

describe('SubcontractorIndentEditComponent', () => {
  let component: SubcontractorIndentEditComponent;
  let fixture: ComponentFixture<SubcontractorIndentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorIndentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorIndentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
