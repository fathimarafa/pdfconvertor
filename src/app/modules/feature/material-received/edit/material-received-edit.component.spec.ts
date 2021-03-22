import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReceivedEditComponent } from './material-received-edit.component';

describe('MaterialReceivedEditComponent', () => {
  let component: MaterialReceivedEditComponent;
  let fixture: ComponentFixture<MaterialReceivedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialReceivedEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialReceivedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
