import { TestBed } from '@angular/core/testing';

import { IsAuthenticatedGuardService } from './is-authenticated-guard.service';

describe('IsAuthenticatedGuardService', () => {
  let service: IsAuthenticatedGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAuthenticatedGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
