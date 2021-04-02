import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIndentCreationComponent } from './material-indent-creation.component';

describe('MaterialIndentCreationComponent', () => {
  let component: MaterialIndentCreationComponent;
  let fixture: ComponentFixture<MaterialIndentCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialIndentCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIndentCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
