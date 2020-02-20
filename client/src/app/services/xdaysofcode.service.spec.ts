import { TestBed } from '@angular/core/testing';

import { XdaysofcodeService } from './xdaysofcode.service';

describe('XdaysofcodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XdaysofcodeService = TestBed.inject(XdaysofcodeService);
    expect(service).toBeTruthy();
  });
});
