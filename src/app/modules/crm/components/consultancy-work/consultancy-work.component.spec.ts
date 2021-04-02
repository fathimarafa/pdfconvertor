import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyWorkComponent } from './consultancy-work.component';

describe('ConsultancyWorkComponent', () => {
  let component: ConsultancyWorkComponent;
  let fixture: ComponentFixture<ConsultancyWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultancyWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultancyWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
