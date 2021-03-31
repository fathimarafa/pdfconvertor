import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicChequeClearenceComponent } from './basic-cheque-clearence.component';

describe('BasicChequeClearenceComponent', () => {
  let component: BasicChequeClearenceComponent;
  let fixture: ComponentFixture<BasicChequeClearenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicChequeClearenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicChequeClearenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
