import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAdvanceEditComponent } from './client-advance-edit.component';

describe('ClientAdvanceEditComponent', () => {
  let component: ClientAdvanceEditComponent;
  let fixture: ComponentFixture<ClientAdvanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAdvanceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAdvanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
