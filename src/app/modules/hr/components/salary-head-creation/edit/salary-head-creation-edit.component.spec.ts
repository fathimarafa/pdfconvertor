import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryHeadCreationEditComponent } from './salary-head-creation-edit.component';

describe('SalaryHeadCreationEditComponent', () => {
  let component: SalaryHeadCreationEditComponent;
  let fixture: ComponentFixture<SalaryHeadCreationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryHeadCreationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryHeadCreationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
