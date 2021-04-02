import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnProjectComponent } from './own-project.component';

describe('OwnProjectComponent', () => {
  let component: OwnProjectComponent;
  let fixture: ComponentFixture<OwnProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
