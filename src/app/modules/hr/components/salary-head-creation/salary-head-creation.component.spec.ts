import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryHeadCreationComponent } from './salary-head-creation.component';

describe('SalaryHeadCreationComponent', () => {
  let component: SalaryHeadCreationComponent;
  let fixture: ComponentFixture<SalaryHeadCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryHeadCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryHeadCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
