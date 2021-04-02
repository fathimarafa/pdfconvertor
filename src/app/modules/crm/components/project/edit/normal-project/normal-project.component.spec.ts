import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalProjectComponent } from './normal-project.component';

describe('NormalProjectComponent', () => {
  let component: NormalProjectComponent;
  let fixture: ComponentFixture<NormalProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
