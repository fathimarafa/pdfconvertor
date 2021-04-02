import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyWorkEditComponent } from './consultancy-work-edit.component';

describe('ConsultancyWorkEditComponent', () => {
  let component: ConsultancyWorkEditComponent;
  let fixture: ComponentFixture<ConsultancyWorkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultancyWorkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultancyWorkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
