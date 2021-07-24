import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAdvanceComponent } from './client-advance.component';

describe('ClientAdvanceComponent', () => {
  let component: ClientAdvanceComponent;
  let fixture: ComponentFixture<ClientAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAdvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
