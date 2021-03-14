import { TestBed } from '@angular/core/testing';

import { ProjectDivisionFieldsHandlerService } from './project-division-fields-handler.service';

describe('ProjectDivisionFieldsHandlerService', () => {
  let service: ProjectDivisionFieldsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDivisionFieldsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
