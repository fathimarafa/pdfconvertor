import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDocumentTypeComponent } from './basic-document-type.component';

describe('BasicDocumentTypeComponent', () => {
  let component: BasicDocumentTypeComponent;
  let fixture: ComponentFixture<BasicDocumentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDocumentTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
