import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentGroupEditComponent } from './document-group-edit.component';

describe('DocumentGroupEditComponent', () => {
  let component: DocumentGroupEditComponent;
  let fixture: ComponentFixture<DocumentGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentGroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
