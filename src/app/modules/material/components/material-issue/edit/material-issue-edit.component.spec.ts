import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIssueEditComponent } from './material-issue-edit.component';

describe('MaterialIssueEditComponent', () => {
  let component: MaterialIssueEditComponent;
  let fixture: ComponentFixture<MaterialIssueEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialIssueEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIssueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
