import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageWorkComponent } from './stage-work.component';

describe('StageWorkComponent', () => {
  let component: StageWorkComponent;
  let fixture: ComponentFixture<StageWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
