import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIndentCreationEditComponent } from './material-indent-creation-edit.component';

describe('MaterialIndentCreationEditComponent', () => {
  let component: MaterialIndentCreationEditComponent;
  let fixture: ComponentFixture<MaterialIndentCreationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialIndentCreationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIndentCreationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
