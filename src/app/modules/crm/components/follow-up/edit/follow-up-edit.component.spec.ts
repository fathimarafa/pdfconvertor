import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpEditComponent } from './follow-up-edit.component';

describe('FollowUpEditComponent', () => {
  let component: FollowUpEditComponent;
  let fixture: ComponentFixture<FollowUpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
