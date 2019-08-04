import { TestBed } from '@angular/core/testing';

import { SharedCodeService } from './shared-code.service';

describe('SharedCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedCodeService = TestBed.get(SharedCodeService);
    expect(service).toBeTruthy();
  });
});
