import { TestBed } from '@angular/core/testing';

import { ProjectDivisionService } from './project-division.service';

describe('ProjectDivisionService', () => {
  let service: ProjectDivisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDivisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
