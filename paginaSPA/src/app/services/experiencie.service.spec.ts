import { TestBed } from '@angular/core/testing';

import { ExperiencieService } from './experiencie.service';

describe('ExperiencieService', () => {
  let service: ExperiencieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperiencieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
