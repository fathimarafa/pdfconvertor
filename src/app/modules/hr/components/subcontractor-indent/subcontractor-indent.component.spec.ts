import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorIndentComponent } from './subcontractor-indent.component';

describe('SubcontractorIndentComponent', () => {
  let component: SubcontractorIndentComponent;
  let fixture: ComponentFixture<SubcontractorIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorIndentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
