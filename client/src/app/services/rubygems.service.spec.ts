import { TestBed } from '@angular/core/testing';

import { RubygemsService } from './rubygems.service';

describe('RubygemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RubygemsService = TestBed.inject(RubygemsService);
    expect(service).toBeTruthy();
  });
});
