import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDefaultListingComponent } from './module-default-listing.component';

describe('ModuleDefaultListingComponent', () => {
  let component: ModuleDefaultListingComponent;
  let fixture: ComponentFixture<ModuleDefaultListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleDefaultListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleDefaultListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
