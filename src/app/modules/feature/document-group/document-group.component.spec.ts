import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentGroupComponent } from './document-group.component';

describe('DocumentGroupComponent', () => {
  let component: DocumentGroupComponent;
  let fixture: ComponentFixture<DocumentGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
